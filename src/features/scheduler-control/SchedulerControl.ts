export const backgroundScheduler = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/background/scheduler`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    if (res.ok && data) {
      return { data: data, success: true };
    }
    if (!res.ok && data) {
      return { error: data, success: false };
    }
  } catch (error) {
    return { error, success: false };
  }
};

export const backgroundSchedulerPut = async (postData) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/background/scheduler`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );

    return res;
  } catch (error) {
    return { error, success: false };
  }
};
