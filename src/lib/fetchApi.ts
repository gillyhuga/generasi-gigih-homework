import axios from "axios";
import { BASE_URL_API, SEARCH, CURRENT_USER_PROFILE, TOP_TRACKS, USERS, PLAYLISTS, TRACKS, CURRENT_USER_PLAYLIST } from "../config/config"

export const getSearchTrack = async (searchKey: string, token: string) => {
    const response = await axios.get(SEARCH, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKey,
            type: "track",
            limit: 18,
        }
    })
    return response.data;
}

export const getUserProfile = async (token: string) => {
    const response = await axios.get(CURRENT_USER_PROFILE, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    return response.data;
}

export const createPlaylist = async (userId: any, token: string, playlistTitle: string, playlistDescription: string) => {
    const response = await axios.post(BASE_URL_API + USERS + `/${userId}` + PLAYLISTS, {
        name: playlistTitle,
        description: playlistDescription,
        public: false,
        collaborative: false,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response?.data?.id
}

export const addTracksToPlaylist = async (playlistId: any, token: string, selectedTracks: any[]) => {
    const response = await axios.post(BASE_URL_API + PLAYLISTS + `/${playlistId}` + TRACKS, {
        uris: selectedTracks.map((song) => song)
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response
}

export const getTopTrack = async (token: string) => {
    const response = await axios.get(TOP_TRACKS, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            limit: 18,
        }
    })
    return response?.data?.items
}

export const getPlaylist = async (token: string) => {
    const response = await axios.get(CURRENT_USER_PLAYLIST, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response?.data?.items
}