export const DATA = async () => {
  const header = { method: "GET", "content-type": "application/json" };

  const data = await fetch("https://api.randomuser.me/?results=10", header);

  const body = data.json();

  return body;
};
