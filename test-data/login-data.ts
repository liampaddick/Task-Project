function getEnvVariables(key: string): string {
    const value = process.env[key];

    if (!value) {
        throw new Error(`Missing env variable ${key}. Please check your .env file`);
    }
    return value;
}
export const loginData = {
    users: {
        standard: getEnvVariables("STANDARD_USER"),
        lockedOut: getEnvVariables("LOCKED_OUT_USER"),
        problem: getEnvVariables("PROBLEM_USER"),
        performanceGlitch: getEnvVariables("PERFORMANCE_GLITCH_USER"),
        error: getEnvVariables("ERROR_USER"),
        visual: getEnvVariables("VISUAL_USER"),
    },
    passwords: {
        correctPassword: getEnvVariables("ALL_USER_PASSWORD"),
        incorrectPassword: getEnvVariables("INCORRECT_PASSWORD"),
    }
};

export const errorMessages = {
    incorrectPassword: "Epic sadface: Username and password do not match any user in this service",
    lockedOut: "Epic sadface: Sorry, this user has been locked out.",
}
