PROFILE_ALGORITHMS = {
    "search_rescue": ["MRMap", "RXAnomaly"],
}


def algorithms_for_profile(profile):
    return PROFILE_ALGORITHMS.get(profile, [])
