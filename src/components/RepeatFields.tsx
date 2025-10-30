import React from 'react';
import { FormControl, FormLabel, Select, MenuItem, Stack, TextField } from '@mui/material';

type Props = {
  repeatType: string;
  setRepeatType: (v: any) => void;
  repeatInterval: number;
  setRepeatInterval: (v: number) => void;
  repeatEndDate: string;
  setRepeatEndDate: (v: string) => void;
};

export default function RepeatFields({
  repeatType,
  setRepeatType,
  repeatInterval,
  setRepeatInterval,
  repeatEndDate,
  setRepeatEndDate,
}: Props) {
  return (
    <Stack spacing={2}>
      <FormControl fullWidth>
        <FormLabel id="repeat-type-label">반복 유형</FormLabel>
        <Select
          size="small"
          value={repeatType === 'none' ? 'daily' : repeatType}
          onChange={(e) => setRepeatType(e.target.value as any)}
          aria-label="반복 유형"
          aria-labelledby="repeat-type-label"
        >
          <MenuItem value="daily">매일</MenuItem>
          <MenuItem value="weekly">매주</MenuItem>
          <MenuItem value="monthly">매월</MenuItem>
          <MenuItem value="yearly">매년</MenuItem>
        </Select>
      </FormControl>
      <Stack direction="row" spacing={2}>
        <FormControl fullWidth>
          <FormLabel htmlFor="repeat-interval">반복 간격</FormLabel>
          <TextField
            id="repeat-interval"
            size="small"
            type="number"
            value={repeatInterval}
            onChange={(e) => setRepeatInterval(Number(e.target.value))}
            inputProps={{ min: 1, 'aria-label': '반복 간격' }}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel htmlFor="repeat-end-date">반복 종료일</FormLabel>
          <TextField
            id="repeat-end-date"
            size="small"
            type="date"
            value={repeatEndDate}
            onChange={(e) => setRepeatEndDate(e.target.value)}
            inputProps={{ 'aria-label': '반복 종료일' }}
          />
        </FormControl>
      </Stack>
    </Stack>
  );
}
