export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  const day = d.getUTCDate();
  const month = d.toLocaleString("default", { month: "long", timeZone: "UTC" });
  const year = d.getUTCFullYear();
  return `${day} ${month}, ${year}`;
};

export const formatQueryParams = (params: {
  [key: string]: string | string[] | undefined;
}): string => {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .flatMap(([key, value]) =>
      Array.isArray(value)
        ? value.map(
            (v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`
          )
        : [`${encodeURIComponent(key)}=${encodeURIComponent(value!)}`]
    )
    .join("&");
};

export const getInitials = (name: string): string => {
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};