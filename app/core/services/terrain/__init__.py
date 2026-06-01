"""
Terrain services module for DTM/DSM elevation data.

Provides elevation lookup, caching, and geoid correction for accurate AOI positioning.
"""

from .TerrainService import TerrainService
from .TerrainCacheService import TerrainCacheService
from .GeoidService import GeoidService
from .ElevationProvider import ElevationProvider, TerrariumProvider
from .TerrainProviderFactory import (
    TerrainProviderFactory,
    PROVIDER_TERRARIUM,
    PROVIDER_USGS_3DEP_LOCAL,
    DEFAULT_PROVIDER_ID,
)
from .USGS3DEPProvider import USGS3DEPProvider

__all__ = [
    'TerrainService',
    'TerrainCacheService',
    'GeoidService',
    'ElevationProvider',
    'TerrariumProvider',
    'TerrainProviderFactory',
    'USGS3DEPProvider',
    'PROVIDER_TERRARIUM',
    'PROVIDER_USGS_3DEP_LOCAL',
    'DEFAULT_PROVIDER_ID',
]
