export async function getIPData() {
  const res = await fetch("http://localhost:3004/api/email/ip", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data /email/ip");
  }

  const { data } = await res.json();
  return data;
}

export async function getHASHData() {
  const res = await fetch("http://localhost:3004/api/email/hash", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data /email/hash");
  }

  const { data } = await res.json();
  return data;
}

export async function getURLData() {
  const res = await fetch("http://localhost:3004/api/email/url", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data from /email/url");
  }

  const { data } = await res.json();
  return data;
}

export async function getDomainData() {
  const res = await fetch("http://localhost:3004/api/email/domain", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data /email/domain");
  }

  const { data } = await res.json();
  return data;
}

export async function getAllData() {
  const data = await Promise.all([
    getIPData(),
    getHASHData(),
    getURLData(),
    getDomainData(),
  ]);

  return data;
}
