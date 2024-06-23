export const normalizePhoneNumber = (phone: string): string => {
  if (phone.startsWith('+')) {
    return phone;
  } else if (phone.startsWith('0')) {
    return `+234${phone.substring(1)}`;
  }

  return `+234${phone}`;
};

export const unnormailzePhoneNumber = (phone: string): string => {
  if (phone.startsWith('+234')) {
    return phone.substring(4);
  } else if (phone.startsWith('0')) {
    return phone.substring(1);
  }

  return phone;
};
