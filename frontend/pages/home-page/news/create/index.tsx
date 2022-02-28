import { withLayout } from '../../../../layout/Layout';
import { Alert, Button, Card, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import HomePageNewsService from '../../../../service/homePage/news/HomePageNews.service';
import { HomePageNewsInterface } from '../../../../interfaces/HomePageNews.interface';
import { useState } from 'react';
import * as React from 'react';
import { useRouter } from 'next/router';

const CreatePage = (): JSX.Element => {
  const homePageNewsService = new HomePageNewsService();
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const onSubmit = handleSubmit((data: HomePageNewsInterface) =>
    homePageNewsService
      .create(data)
      .then(() => router.push('/'))
      .catch((e) => setErrors([...errors, ...e])),
  );

  return (
    <>
      {errors.length > 0 &&
        errors.map((error) => (
          <Alert key={error} severity="error">
            {error}
          </Alert>
        ))}

      <Card sx={{ padding: '1em' }}>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="icon"
                label="Иконка"
                variant="outlined"
                fullWidth
                {...register('icon')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="title"
                label="Заголовок"
                variant="outlined"
                fullWidth
                {...register('title', { required: true })}
              />
              {formErrors.title && (
                <Alert severity="error">
                  <span>Поле "Заголовок" обязательно к заполнению</span>
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="text"
                label="Текст"
                multiline
                rows={3}
                defaultValue="Default Value"
                {...register('text', { required: true })}
              />
              {formErrors.text && (
                <Alert severity="error">
                  <span>Поле "текст" обязательно к заполнению</span>
                </Alert>
              )}
            </Grid>
            <Grid item md={4} xs={12}>
              <Button type="submit" fullWidth variant="contained">
                Добавить новость
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </>
  );
};

export default withLayout(CreatePage);
