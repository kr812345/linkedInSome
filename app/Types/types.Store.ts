interface ProfileData {
    banner?: string;
    bio?: string;
    about?: string;
    posts?: string[];
    profilePicture?: string;
    message?: string;
}

type llmResponseStore = {
    data: ProfileData | string | null;
    setData: (data: ProfileData | string | null) => void;
}

export type { llmResponseStore, ProfileData };