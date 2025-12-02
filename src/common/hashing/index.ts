import * as bcrypt from 'bcrypt';
export const generateHashing = async (data: string) => {
  return bcrypt.hashSync(data, 10);
};

export const comparHashing = async (data: string, dataHashing: string) => {
  return bcrypt.compareSync(data, dataHashing);
};
