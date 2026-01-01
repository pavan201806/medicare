"""
Medicine Service
Provides medicine information search functionality
Non-prescriptive, educational information only
"""
from typing import List
from app.schemas.medicine import MedicineInfo
import logging

logger = logging.getLogger(__name__)


# Sample medicine database (in production, this would be a real database)
MEDICINE_DATABASE = {
    "paracetamol": MedicineInfo(
        name="Paracetamol",
        usage=(
            "Paracetamol (also known as acetaminophen) is commonly used to relieve "
            "mild to moderate pain and reduce fever. It is often used for headaches, "
            "muscle aches, arthritis, backaches, toothaches, colds, and fevers."
        ),
        precautions=[
            "Do not exceed the recommended dosage",
            "Avoid alcohol while taking this medication",
            "Consult a doctor if symptoms persist for more than 3 days",
            "Not recommended for children under 2 years without medical supervision",
            "Inform your doctor if you have liver or kidney problems"
        ]
    ),
    "ibuprofen": MedicineInfo(
        name="Ibuprofen",
        usage=(
            "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to reduce "
            "inflammation, pain, and fever. It is commonly used for conditions like "
            "arthritis, menstrual cramps, and minor injuries."
        ),
        precautions=[
            "Take with food or milk to reduce stomach upset",
            "Do not use if you have a history of stomach ulcers",
            "Avoid prolonged use without medical supervision",
            "May increase risk of heart attack or stroke with long-term use",
            "Consult a doctor before use if you have heart, kidney, or liver conditions"
        ]
    ),
    "amoxicillin": MedicineInfo(
        name="Amoxicillin",
        usage=(
            "Amoxicillin is an antibiotic used to treat various bacterial infections "
            "including respiratory infections, ear infections, urinary tract infections, "
            "and skin infections."
        ),
        precautions=[
            "Complete the full course even if you feel better",
            "Do not share this medication with others",
            "Inform your doctor if you have allergies to penicillin",
            "May cause diarrhea - consult doctor if severe",
            "Take at regular intervals as prescribed by your healthcare provider"
        ]
    ),
    "aspirin": MedicineInfo(
        name="Aspirin",
        usage=(
            "Aspirin is used to relieve pain, reduce inflammation, and lower fever. "
            "It is also sometimes used in low doses to help prevent heart attacks and strokes."
        ),
        precautions=[
            "Do not give to children or teenagers with fever or flu symptoms",
            "May increase risk of bleeding",
            "Avoid alcohol while taking aspirin",
            "Consult a doctor before use if you have stomach problems or bleeding disorders",
            "Not recommended during pregnancy without medical supervision"
        ]
    ),
    "omeprazole": MedicineInfo(
        name="Omeprazole",
        usage=(
            "Omeprazole is a proton pump inhibitor used to treat conditions related to "
            "stomach acid, such as acid reflux, heartburn, and stomach ulcers."
        ),
        precautions=[
            "Take as directed, usually before meals",
            "Do not crush or chew delayed-release capsules",
            "Consult a doctor if symptoms persist or worsen",
            "Long-term use may require medical supervision",
            "Inform your doctor of all medications you are taking"
        ]
    ),
}


class MedicineService:
    """
    Service for searching medicine information
    """
    
    def search_medicines(self, query: str) -> List[MedicineInfo]:
        """
        Search for medicine information by name
        
        Args:
            query: Search query (medicine name)
        
        Returns:
            List of matching medicine information
        """
        query_lower = query.lower().strip()
        results = []
        
        # Exact match
        if query_lower in MEDICINE_DATABASE:
            results.append(MEDICINE_DATABASE[query_lower])
            logger.info(f"Found exact match for: {query}")
            return results
        
        # Partial match
        for medicine_name, medicine_info in MEDICINE_DATABASE.items():
            if query_lower in medicine_name or medicine_name in query_lower:
                results.append(medicine_info)
        
        # If no matches, return empty list
        if not results:
            logger.info(f"No matches found for: {query}")
        
        return results


# Global medicine service instance
medicine_service = MedicineService()

