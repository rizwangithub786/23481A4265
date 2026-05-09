export async function Log(stack, level, packageName, message) {
  const logData = {
    stack: stack,
    level: level,
    package: packageName,
    message: message,
  };

  try {
    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logData),
    });

    const data = await response.json();

    console.log("Log Success:", data);
  } catch (error) {
    console.log("Log Error:", error);
  }
}