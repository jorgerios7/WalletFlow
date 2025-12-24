import { Entries } from "@/app/types/Finance";

export const GroupEntriesByDate = (entries: Entries[]): { title: string; data: Entries[], value: number }[] => {
    const grouped: { [key: string]: Entries[] } = {};

    for (const entry of entries) {
      if (!grouped[entry.dueDate]) grouped[entry.dueDate] = [];
      grouped[entry.dueDate].push(entry);
    }

    return Object.keys(grouped)
      .sort((a, b) => {
        const [da, ma, ya] = a.split('/').map(Number);
        const [db, mb, yb] = b.split('/').map(Number);
        const dateA = new Date(ya, ma - 1, da);
        const dateB = new Date(yb, mb - 1, db);
        return dateA.getTime() - dateB.getTime();
      })
      .map((date) => {
        const [d, m, y] = date.split('/').map(Number);
        const dateObj = new Date(y, m - 1, d);

        const weekday = dateObj.toLocaleDateString('pt-BR', { weekday: 'long' });
        const day = dateObj.toLocaleDateString('pt-BR', { day: '2-digit' });
        const monthYear = dateObj.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

        const title = `${weekday}, dia ${day} de ${monthYear}`.toLowerCase();

        const value = grouped[date].reduce((sum, item) => {
          return sum + (item.paymentType === 'concluded' ? item.value : 0);
        }, 0);

        return { title, data: grouped[date], value };
      });
  };