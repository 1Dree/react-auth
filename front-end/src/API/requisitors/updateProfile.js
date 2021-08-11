const updateProfile = stateSetter => async (userId, data) => {
  if (!userId || !data) return;

  try {
    const response = await fetch("http://localhost:3000/update-profile", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, data }),
    });
    if (response.status !== 200) throw new Error();
    const dbData = await response.json();

    stateSetter(dbData);
  } catch (err) {
    throw err;
  }
};

export default updateProfile;
