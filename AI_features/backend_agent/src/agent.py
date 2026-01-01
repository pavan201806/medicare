import os
import asyncio
import logging
from dotenv import load_dotenv

from livekit import rtc
from livekit.agents import (
    Agent,
    AgentServer,
    AgentSession,
    JobContext,
    JobProcess,
    cli,
    inference,
)
from livekit.plugins import silero, simli

# --------------------------------------------------
# Setup
# --------------------------------------------------
load_dotenv(".env.local")
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("medical-agent")

# --------------------------------------------------
# Agent logic
# --------------------------------------------------
class MedicalAssistant(Agent):
    def __init__(self):
        super().__init__(
            instructions="""
You are a medical voice assistant.
Provide general health information only.
Do not diagnose diseases.
Do not prescribe medications.
If symptoms sound serious, advise seeing a doctor.
If it sounds like an emergency, advise immediate medical help.
"""
        )

# --------------------------------------------------
# Agent server (REQUIRED in 1.1.x)
# --------------------------------------------------
server = AgentServer()

def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()

server.setup_fnc = prewarm

# --------------------------------------------------
# RTC Session
# --------------------------------------------------
@server.rtc_session()
async def medical_agent(ctx: JobContext):
    ctx.log_context_fields = {"room": ctx.room.name}

    logger.info("SIMLI_API_KEY loaded: %s", bool(os.getenv("SIMLI_API_KEY")))
    logger.info("SIMLI_FACE_ID: %s", os.getenv("SIMLI_FACE_ID"))

    # Agent session
    session = AgentSession(
        stt=inference.STT(
            model="assemblyai/universal-streaming",
            language="en",
        ),
        llm=inference.LLM(
            model="openai/gpt-4o-mini",
        ),
        tts=inference.TTS(
            model="cartesia/sonic-3",
            voice="9626c31c-bec5-4cca-baa8-f8ba9e84c8bc",
        ),
        vad=ctx.proc.userdata["vad"],
        preemptive_generation=True,
    )

    # Simli avatar (video participant)
    avatar = simli.AvatarSession(
        simli_config=simli.SimliConfig(
            api_key=os.getenv("SIMLI_API_KEY"),
            face_id=os.getenv("SIMLI_FACE_ID"),
        ),
    )

    # Avatar joins FIRST
    await avatar.start(session, room=ctx.room)

    # Start agent
    await session.start(
        agent=MedicalAssistant(),
        room=ctx.room,
    )

    # Connect + greeting
    await ctx.connect()
    await asyncio.sleep(1.5)

    await session.say(
        "Hello. I am your medical assistant. How can I help you today?"
    )

# --------------------------------------------------
# Run (ONLY THIS in 1.1.x)
# --------------------------------------------------
if __name__ == "__main__":
    cli.run_app(server)
