import { TransactionType } from "@/app/types/Finance";
import categoriesDefault from "@/assets/data/categories.json";
import * as FileSystem from "expo-file-system/legacy";

// Caminho no sandbox do app
const FILE_PATH = FileSystem.documentDirectory + "categories.json";

// 🔹 Inicializa o arquivo se não existir
async function ensureFileExists() {
  const fileInfo = await FileSystem.getInfoAsync(FILE_PATH);
  if (!fileInfo.exists) {
    await FileSystem.writeAsStringAsync(
      FILE_PATH,
      JSON.stringify(categoriesDefault, null, 2)
    );
  }
}

// 🔹 Carregar todas as categorias
export async function LoadCategories(type: TransactionType): Promise<string[]> {
  await ensureFileExists();
  const content = await FileSystem.readAsStringAsync(FILE_PATH);
  const data = JSON.parse(content) as Record<TransactionType, string[]>;
  return data[type] ?? [];
}

// 🔹 Adicionar categoria
export async function AddCategory(type: TransactionType, newCategory: string): Promise<string[]> {
  await ensureFileExists();
  const content = await FileSystem.readAsStringAsync(FILE_PATH);
  const data = JSON.parse(content) as Record<TransactionType, string[]>;

  const normalized = newCategory.trim(); 
  const exists = data[type].some(
    (c) => c.toLowerCase() === normalized.toLowerCase()
  );

  if (!exists) {
    data[type].push(normalized);
    await FileSystem.writeAsStringAsync(FILE_PATH, JSON.stringify(data, null, 2));
  }

  return data[type];
}

// 🔹 Remover categoria
export async function DeleteCategory(type: TransactionType, categoryToDelete: string): Promise<string[]> {
  await ensureFileExists();
  const content = await FileSystem.readAsStringAsync(FILE_PATH);
  const data = JSON.parse(content) as Record<TransactionType, string[]>;

  data[type] = data[type].filter(
    (c) => c.toLowerCase() !== categoryToDelete.trim().toLowerCase()
  );

  await FileSystem.writeAsStringAsync(FILE_PATH, JSON.stringify(data, null, 2));
  return data[type];
}
