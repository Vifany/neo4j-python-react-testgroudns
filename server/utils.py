import random
from string import ascii_letters, digits

ALPHABET = ascii_letters + digits

def random_string(size: int =8) -> str:
    """Generates random alphanumeric string of set size

    Args:
        size (int, optional): size of string. Defaults to 8.

    Returns:
        str: random alphanumeric string
    """
    
    return ''.join(random.choices(ALPHABET, k=size))