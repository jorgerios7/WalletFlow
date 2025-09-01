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
