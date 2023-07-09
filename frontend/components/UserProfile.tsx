import { Button, Card, CardMedia, Container, Grid, Typography } from '@mui/material'
// import  from '@mui/material/Unstable_Grid2/Grid2'

export const UserProfile = () => {
  return (
    <div className='shadow-md p-5 mb-5'>
      <Container maxWidth='lg'>
        <Typography component='h4' variant='h4' sx={{ mb: 2 }}>
          Профиль
        </Typography>
        <Grid container>
          <Grid md={4}>
            <Card sx={{ maxWidth: 250 }}>
              <CardMedia
                component='img'
                image='https://memepedia.ru/wp-content/uploads/2020/07/shampun-zhumajsynba-5.jpg'
                alt='shampoo'
                sx={{
                  display: 'block',
                  margin: '0 auto',
                }}
              />
            </Card>
          </Grid>

          <Grid md={8} display='flex' direction='column' justifyContent='center' alignItems='start'>
            <Typography
              component='p'
              variant='body1'
              sx={{ width: `${70}%`, borderBottom: 1, mb: 1, mt: 2 }}
            >
              Имя : Ребята
            </Typography>
            <Typography
              component='p'
              variant='body1'
              sx={{ width: `${70}%`, borderBottom: 1, mb: 1 }}
            >
              Фамилия : Видели
            </Typography>
            <Typography
              component='p'
              variant='body1'
              sx={{ width: `${70}%`, borderBottom: 1, mb: 1 }}
            >
              Почта : РебятаМаксКонтент@mail.ru
            </Typography>

            <Grid container>
              <Grid md={12} display='flex' justifyContent='start'>
                <Button
                  sx={{ marginTop: 1, marginBottom: 1, padding: 1, width: 200 }}
                  variant='contained'
                  className='bg-blue-500'
                >
                  Сменить данные
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
