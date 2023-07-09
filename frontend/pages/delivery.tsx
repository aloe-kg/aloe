import { ReactElement } from 'react'
import { Breadcrumbs, PageTitle } from '@components'
import { Box, List, ListItem, Paper, Typography } from '@mui/material'
import { RootLayout } from 'layouts'
import { NextPageWithLayout } from 'pages/_app'

const Delivery: NextPageWithLayout = () => {
  return (
    <>
      <Breadcrumbs replaceList={{ url_path: 'delivery', name: 'Оплата и Доставка' }} />
      <PageTitle title='Оплата и Доставка' mb={1} />
      <Paper>
        <List>
          <ListItem>
            <Typography variant='h5'>Способы доставки</Typography>
          </ListItem>
          <ListItem>
            <Typography component='p' variant='body1' pl={1}>
              Доставка курьером шесть дней в неделю.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h5'>Стоимость доставки</Typography>
          </ListItem>
          <ListItem>
            <Typography component='p' variant='body1' pl={1}>
              Доставка по центру города Бишкек и ближнаходящиеся жилмассивы осуществляется по цене —
              150{' '}
              <Box component='span' sx={{ fontWeight: 'bold' }}>
                {' '}
                сом (минимальная сумма заказа 500 сом)
              </Box>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography component='p' variant='body1' pl={1}>
              ПРИ ЗАКАЗЕ СВЫШЕ 5000 сом доставка осуществляется БЕСПЛАТНО только по городу Бишкек.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography component='p' variant='body1' pl={1}>
              Доставка в регионы зависит от габаритов и расстояния, установлена усреднённая
              стоимость 290 сом , но может варьироваться , итоговая стоимость за доставку вам
              сообщается по телефону , после оформления заказа.{' '}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h5'>Способы оплаты:</Typography>
          </ListItem>
          <ListItem>
            <Typography component='p' variant='body1' pl={1}>
              - Наличными
            </Typography>
          </ListItem>
          <ListItem>
            <Typography component='p' variant='body1' pl={1}>
              - Элсом
            </Typography>
          </ListItem>
          <ListItem>
            <Typography component='p' variant='body1' pl={1}>
              - MegaPay
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h5'>Дополнительная информация о доставке</Typography>
          </ListItem>
          <ListItem>
            <Typography component='p' variant='body1' pl={1}>
              Заявки принятые до 15.00 дня доставляются в тот же день до 20.00 вечера, заявки
              принятые после 15.00 будут доставлены на следующий день.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography component='p' variant='body1' pl={1}>
              Доставка производится 6 дней в неделю, понедельник выходной.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h5'>Возврат товара</Typography>
          </ListItem>
          <ListItem>
            <Typography component='p' variant='body1' pl={1}>
              Возврат возможен в течение двух дней только нового, неиспользованного товара. Расходы
              по доставке товара в указанный пункт возврата несет покупатель.{' '}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography component='p' variant='body1' pl={1}>
              Удачных покупок!{' '}
            </Typography>
          </ListItem>
        </List>
      </Paper>
    </>
  )
}
Delivery.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout title='Оплата и Доставка'>{page}</RootLayout>
}

export default Delivery
