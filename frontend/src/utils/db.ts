 const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const createUser = async (user: {
    name: string;
    email: string;
    NetID: string;
    userType: string;
    hash: string;
}) => {
    try {
    const response = await fetch(`${API_ENDPOINT}/users/create.php`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
    } catch (error) {
    console.error("Error creating user:", error);
    throw error;
    }
};

 export const getUser = async (email: string) => {
    try {
     const response = await fetch(`${API_ENDPOINT}/users/read.php?email=${email}`);
     const data = await response.json();
     return data;
    } catch (error) {
     console.error("Error getting user:", error);
     throw error;
    }
 };
 export const validateUser = async (email: string | unknown, hash: string | unknown) => {
    if (typeof email !== "string" || typeof hash !== "string") {
     throw new Error("Email and hash must be strings");
    }
    try {
     const response = await fetch(
        `${API_ENDPOINT}/users/validate.php?email=${email}&hash=${hash}`
     );
     const data = await response.json();
     return data;
    } catch (error) {
     console.error("Error validating user:", error);
     throw error;
    }
 }

 export const updateUser = async (
    userId: string,
    updates: { [key: string]: unknown }
 ) => {
    try {
     const response = await fetch(`${API_ENDPOINT}/users/update.php`, {
        method: "POST",
        headers: {
         "Content-Type": "application/json",
        },
        body: JSON.stringify({
         id: userId,
         ...updates,
        }),
     });

     const data = await response.json();
     return data;
    } catch (error) {
     console.error("Error updating user:", error);
     throw error;
    }
 };