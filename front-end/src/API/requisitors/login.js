const login = stateSetter => async (email, password) => {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.status !== 200) throw new Error();

    const data = await response.json();

    stateSetter(data);
  } catch (err) {
    throw err;
  }
};

export default login;
