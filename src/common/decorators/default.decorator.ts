import { Transform } from 'class-transformer';

// default value for DTO
export const Default = (defaultValue: any) => {
  return Transform((target: any) => target || defaultValue);
};
