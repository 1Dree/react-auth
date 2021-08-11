const signup = stateSetter => async (email, password) => {
  try {
    const response = await fetch("http://localhost:3000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userData: { email, password } }),
    });
    if (response.status !== 200) throw new Error();

    const data = await response.json();

    stateSetter(data);
  } catch (err) {
    throw err;
  }
};

export default signup;

// export default async function signup(email, password) {
//   console.log(email, password);

//   try {
//     const response = await fetch("http://localhost:3000/");

//     return response.json();
//   } catch (err) {
//     console.log(err);
//   }
// }
