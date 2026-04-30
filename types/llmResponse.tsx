'use client'
import React from "react";

export default interface RosterResponse {
    success: string;
    message: string;
    data: llmResponse;
}

export interface llmResponse {
    banner: string;
    profilePicture: string;
    bio: string;
    about: string;
    featured: string;
}

