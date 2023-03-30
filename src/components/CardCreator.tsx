import { FC, useState, useCallback } from 'react';
import { Box, Card, CardContent, Typography, CardMedia, Stack } from '@mui/material';
import { ChevronLeft, ChevronRight, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import { IState, IData } from '../types';
import { removeProductById } from '../store/productsSlice';

interface IHightLight {
  filter: string;
  descriptionText: string;
}

const HightLight = (props: IHightLight): any => {
  const { filter, descriptionText } = props;

  if (filter.length === 0) {
    return descriptionText;
  }

  const regexp = new RegExp(filter, 'ig');
  const matchValue = descriptionText.match(regexp);

  if (!matchValue) {
    return descriptionText;
  }

  return descriptionText.split(regexp).map((rawString: string, index: number, arr: string[]) => {
    if (index >= arr.length - 1) {
      return rawString;
    }

    const highlightedString = matchValue.shift();
    return (
      <>
        {rawString}
        <span key={Math.random()} className="hightlight">
          {highlightedString}
        </span>
      </>
    );
  });
};

const CardCreator: FC<IData> = (props) => {
  const searchType: string = useSelector((state: IState) => state?.searchType);
  const dispatch = useDispatch();
  const [imageNum, setImageNum] = useState<number>(0);
  const { id, title, description, price, rating, stock, category, images } = props;
  const searchValue = useSelector((state: IState) => state?.searchBy);

  const changImage = (imageAction: number): void => {
    if (imageNum + imageAction < 0) {
      setImageNum(images.length - 1);
    } else if (imageNum + imageAction > images.length - 1) {
      setImageNum(0);
    } else {
      setImageNum(imageNum + imageAction);
    }
  };

  const light = useCallback(
    (descriptionText: string) => {
      return <HightLight filter={searchValue} descriptionText={descriptionText} />;
    },
    [searchValue],
  );

  return (
    <Box
      sx={{
        margin: '45px auto 0 auto',
        maxWidth: '350px',
        ':hover': { transform: 'scale(1.05)' },
      }}>
      <Card>
        <CardContent sx={{ padding: '25px 25px 0 25px' }}>
          <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography variant="h6">ID: {id}</Typography>
            <Delete
              onClick={() => dispatch(removeProductById(id))}
              sx={{ ':hover': { color: '#bc0000', transform: 'scale(1.2)' } }}
              fontSize="large"
            />
          </Stack>

          <Typography
            sx={{ marginTop: '24px', fontSize: '24px', lineHeight: '30px', fontWeight: 400 }}
            gutterBottom
            variant="h5"
            component="div">
            {searchType === 'title' ? light(title) : title}
          </Typography>
          {description && (
            <Typography
              sx={{ marginTop: '24px', fontSize: '24px', lineHeight: '30px', fontWeight: 400 }}
              gutterBottom
              variant="body1"
              component="div">
              {description}
            </Typography>
          )}
          {price && <Typography variant="h6">Price: {price}$</Typography>}
        </CardContent>
        <CardMedia
          sx={{ objectFit: 'contain' }}
          component="img"
          height="217"
          image={images[imageNum]}
          alt={title}
        />

        {images.length > 1 ? (
          <Stack
            sx={{
              padding: '0 15px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <ChevronLeft
              sx={{ ':hover': { transform: 'scale(1.5)' } }}
              fontSize="large"
              onClick={() => changImage(-1)}
            />
            <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
              {images.map((e, i) => {
                return (
                  <span
                    key={i}
                    style={{
                      width: '10px',
                      height: '10px',
                      backgroundColor: '#000',
                      borderRadius: '100%',
                      margin: '0 3px',
                    }}
                    className={i === imageNum ? 'bigDote' : ''}
                    onClick={() => setImageNum(i)}
                  />
                );
              })}
            </Stack>
            <ChevronRight
              sx={{ ':hover': { transform: 'scale(1.5)' } }}
              fontSize="large"
              onClick={() => changImage(1)}
            />
          </Stack>
        ) : null}

        <CardContent sx={{ padding: '25px 25px 0 25px' }}>
          <Typography variant="h6">Rating: {rating}</Typography>
          {stock && <Typography variant="h6">Stock: {stock}</Typography>}
          {category && (
            <Typography variant="h6">
              Category: {searchType === 'category' ? light(category) : category}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardCreator;
