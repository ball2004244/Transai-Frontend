export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getRoomData = async (room_id: string) => {
  try {
    const URL = `${API_URL}/room/${room_id}`;

    const request = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await request.json();

    return response;
  } catch (err) {
    return;
  }
};

export const joinRoom = async (room_id: string, user_id: string) => {
  try {
    // call join room api
    const URL = `${API_URL}/room/join`;

    const data = {
      room_id: room_id,
      user_id: user_id,
    };

    const request = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    return response;
  } catch (err) {
    return;
  }
};

export const leaveRoom = async (room_id: string, user_id: string) => {
  // call leave room api
  try {
    const URL = `${API_URL}/room/leave`;

    const data = {
      room_id: room_id,
      user_id: user_id,
    };

    const request = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    return response;
  } catch (err) {
    return;
  }
};

export const createRoom = async (user_id: string) => {
  try {
    // call create room api
    const URL = `${API_URL}/room`;

    const data = {
      user_ids: [user_id],
    };

    const request = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    return response;
  } catch (err) {
    return;
  }
};

export const getRoomMessages = async (room_id: string) => {
  try {
    const URL = `${API_URL}/chat/room/${room_id}`;
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return data;
  } catch (err) {
    return;
  }
};

export const sendMessageToRoom = async (
  room_id: string,
  user_id: string,
  text: string,
  language: string
) => {
  try {
    const URL = `${API_URL}/chat`;
    const request = {
      user_id: user_id,
      room_id: room_id,
      text: text,
      language: language,
    };

    const data = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const response = await data.json();

    return response;
  } catch (err) {
    return;
  }
};

export const loginToApp = async (username: string, password: string) => {
  try {
    const URL = `${API_URL}/auth/login`;
    const data = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const response = await data.json();

    return response;
  } catch (err) {
    return;
  }
};

export const registerToApp = async (username: string, password: string, name: string, phone: string, language: string) => {
  try {
    const URL = `${API_URL}/auth/register`;

    const data = {
      username,
      password,
      name,
      phone_number: phone,
      language,
    };

    const request = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    return response;
  } catch (err) {
    return;
  }
};
