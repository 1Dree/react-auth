const newPassword = async (email, password) => {
  try {
    const response = await fetch("http://localhost:3000/new-password", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.status !== 200) {
      throw new Error();
    }
  } catch (err) {
    throw err;
  }
};

export default newPassword;
