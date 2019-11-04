export interface Todo {
    id: number;
    title: string;
    description?: string;
    status: 'done' | 'undone';
}
