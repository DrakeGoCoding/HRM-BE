export type ValueOf<T> = T[keyof T];
export type AtLeast<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;
export type WithRequiredProperty<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
};
export type Modify<T, R> = Omit<T, keyof R> & R;
