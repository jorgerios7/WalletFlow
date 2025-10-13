export function MaskCurrency(value: string) {
  const numericValue = value.replace(/\D/g, "");
  const amount = parseFloat(numericValue) / 100;
  if (isNaN(amount)) return "";

  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function MaskDate(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 2) {
    return digits;
  } else if (digits.length <= 4) {
    return digits.replace(/(\d{2})(\d{0,2})/, "$1/$2");
  } else {
    return digits.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
  }
}

export function FormatDateBR (date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export function SepareteDate (date: string) {
  if (!date) return new Date();
  const [day, month, year] = date.split("/");
  return new Date(Number(year), Number(month) - 1, Number(day));
};