import { Paper, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Image } from './base/';

export interface TwitchProps {}

export const Twitch: React.FC<TwitchProps> = () => {
  const theme = useTheme();
  return (
    <Paper sx={{ p: 1 }}>
      <Image
        src="dhttps://hrzfbjovxgyhsrevsuev.supabase.co/storage/v1/object/sign/638716e6-652f-479b-b470-a7634cd75e37/ShareX/EscapeFromTarkov_baT6wr1MYS.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiI2Mzg3MTZlNi02NTJmLTQ3OWItYjQ3MC1hNzYzNGNkNzVlMzcvU2hhcmVYL0VzY2FwZUZyb21UYXJrb3ZfYmFUNndyMU1ZUy5qcGciLCJ0cmFuc2Zvcm1hdGlvbnMiOiIiLCJpYXQiOjE2NzM3MTA5MDksImV4cCI6MTY3MzcxNDUwOX0.cqDShyHlStiIJIzRTWgNlF7zqBwuaLSWdOCIUmnnka4"
        alt="dassd"
        style={{
          width: '100%',
          height: 'auto',
          aspectRatio: '16/9',
          borderRadius: `${theme.shape.borderRadius * 0.5}px`,
        }}
      />
      <Typography fontWeight="bolder">Streamer</Typography>
      <Typography>Subtitle</Typography>
    </Paper>
  );
};
