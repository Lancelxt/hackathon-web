import React, { useEffect, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { Hackathon } from '../contexts/HackathonContext';
import { useNavigate } from 'react-router-dom';
import "./styles/HackathonCard.css";

interface Props {
  hackathon: Hackathon;
}

const HackathonCard: React.FC<Props> = ({ hackathon }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'active' | 'upcoming' | 'past'>('upcoming');
  const [timer, setTimer] = useState<{ displayTime: string, detailedTime: string }>({ displayTime: '', detailedTime: '' });

  useEffect(() => {
    const now = new Date();
    const start = new Date(hackathon.startDate);
    const end = new Date(hackathon.endDate);

    if (now >= start && now <= end) {
      setStatus('active');
      const distance = end.getTime() - now.getTime();
      updateTimer(distance);
      const interval = setInterval(() => {
        const newNow = new Date();
        const newDistance = end.getTime() - newNow.getTime();
        if (newDistance < 0) {
          clearInterval(interval);
          setStatus('past');
        } else {
          updateTimer(newDistance);
        }
      }, 1000);
      return () => clearInterval(interval);
    } else if (now < start) {
      setStatus('upcoming');
      const distance = start.getTime() - now.getTime();
      updateTimer(distance);
      const interval = setInterval(() => {
        const newNow = new Date();
        const newDistance = start.getTime() - newNow.getTime();
        if (newDistance < 0) {
          clearInterval(interval);
          setStatus('active');
        } else {
          updateTimer(newDistance);
        }
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setStatus('past');
    }
  }, [hackathon.startDate, hackathon.endDate]);

  const updateTimer = (distance: number) => {
    if (distance < 0) {
      setTimer({ displayTime: '00:00:00', detailedTime: 'Expired' });
      return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    setTimer({
      displayTime: `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`,
      detailedTime: `${days} days ${hours} hours ${minutes} minutes`
    });
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const formattedDate = date.toLocaleDateString(undefined, options);
    const [day, month, year, time] = formattedDate.split(' ');
    return `${day} ${month}'${year} ${time}`;
  };

  const getStatusChip = () => {
    if (status === 'active') return <Chip label="Active" color="success" className='chip'/>;
    if (status === 'upcoming') return <Chip label="Upcoming" color="info" className='chip'/>;
    return <Chip label="Past" color="error" className='chip'/>;
  };

  return (
    <Card className='card-main'>
      <CardActionArea onClick={() => navigate(`/hackathon/${hackathon.id}`)}>
        <CardMedia
          component="img"
          className='card-img'
          image={hackathon.image}
          alt={hackathon.name}
        />
        <CardContent className='card-content'>
          <Box display="flex" flexDirection={'column'} gap={'16px'} justifyContent="center" alignItems="center">
            <Box>
              {getStatusChip()}
            </Box>
            <Typography fontSize={'16px'} fontWeight={'600'} color='#000000' component="div">
              {hackathon.name}
            </Typography>
          </Box>
          <Box className='timer-container'>
            {status === 'active' && (
              <>
                <Typography className='t2' color="text.primary">
                  Ends in:
                </Typography>
                <Typography className='timer-display' variant="h6" color="text.primary">
                  {timer.displayTime}
                </Typography>
                <Typography className='timer-details' variant="body2" color="text.primary">
                  <span>Days</span>
                  <span>Hours</span>
                  <span>Minutes</span>
                </Typography>
              </>
            )}
            {status === 'upcoming' && (
              <>
                <Typography style={{ fontSize: 14, fontWeight: "500", color: "#4F4F4F" }}>
                  Starts in:
                </Typography>
                <Typography className='timer-display' variant="h6" color="text.primary">
                  {timer.displayTime}
                </Typography>
                <Typography className='timer-details'>
                  <span>Days</span>
                  <span>Hours</span>
                  <span>Minutes</span>
                </Typography>
              </>
            )}
            {status === 'past' && (
              <Typography className='t3'>
                <span>Ended on:</span>
                <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#4F4F4F" }}>
                  {formatDate(new Date(hackathon.endDate))}
                </span>
              </Typography>
            )}
          </Box>
          <Box marginTop={2}>
            <Button  sx={{
    textTransform: 'none',
    color: '#FFFFFF',
    backgroundColor: '#44924C',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
  }} style={{textTransform:'none'}} onClick={() => navigate(`/hackathon/${hackathon.id}`)}>
              Participate Now
            </Button>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default HackathonCard;
