import React, { useContext } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import { HackathonContext } from '../contexts/HackathonContext';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/HackathonDetails.css';
import { red } from '@mui/material/colors';
import mainLogo from '../assets/icons/main_logo_with_darktext_dphi 1.svg';
import level from '../assets/icons/carbon_skill-level-basic.svg';
import clock from '../assets/icons/clock.svg';

const HackathonDetail: React.FC = () => {
  const context = useContext(HackathonContext);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!context) {
    return null;
  }

  const { hackathons, deleteHackathon } = context;

  const hackathon = hackathons.find((hack) => hack.id === Number(id));

  if (!hackathon) {
    return (
      <Box padding={4}>
        <Typography variant="h5">Challenge not found.</Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          Go Back
        </Button>
      </Box>
    );
  }

  const handleDelete = () => {
    deleteHackathon(hackathon.id);
    navigate('/');
  };

  const now = new Date();
  const startDate = new Date(hackathon.startDate);
  const endDate = new Date(hackathon.endDate);

  // Determine the current status of the hackathon
  const hackathonStatus =
    startDate > now ? 'upcoming' : endDate < now ? 'ended' : 'active';

    const handleLogoClick = () => {
      navigate('/');
    };
    
  return (
    <Box>
      <Box paddingTop={0.4} paddingBottom={0.4} paddingLeft={1} onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
      <img src={mainLogo} alt="DPhi Logo" style={{ width: '88px' }} />
      </Box>
      <Box className="hero-section2" display="flex" flexDirection="column" gap="32px">
      <Box className="time-section">
        {hackathonStatus === 'upcoming' && (
          <Typography fontSize={'14px'} fontWeight={'600'} >
           Starts on: {startDate.toLocaleString()} (Indian Standard Time)
          </Typography>
        )}
        {hackathonStatus === 'active' && (
          <>
          <img src={clock} alt="clock" style={{ width: '14px' }} />
            <Typography fontSize={'14px'} fontWeight={'600'}>
            Ends on: {endDate.toLocaleString()} (Indian Standard Time)
            </Typography>
          </>
        )}
        {hackathonStatus === 'ended' && (
          <Typography fontSize={'14px'} fontWeight={'600'} >
            Ended on: {endDate.toLocaleString()} (Indian Standard Time)
          </Typography>
        )}
      </Box>
        <Typography className='tt'>
          {hackathon.name}
        </Typography>
        <Typography  className='th' gutterBottom fontWeight="500" fontSize="18px">
          {hackathon.description}
        </Typography>
        <Box className='level'>
      <img src={level} alt="level" style={{ width: '16px' }} />
          <Typography style={{ fontSize: '16px', fontWeight: '600' }}>{hackathon.level}</Typography>
        </Box>
      </Box>

     

      <Box className='crd'>
        <Box>
          <Typography fontSize={18} fontWeight={700} borderBottom={4} borderColor={"#0c771e"} paddingBottom={1}>
            Overview
          </Typography>
        </Box>
        <Box className='crd2'>
        <Button
          variant="contained"
          color="success"
          className='btn3'
          onClick={() => navigate(`/edit/${hackathon.id}`)}

        >
          <strong>Edit</strong>
        </Button>
        <Button   className='btn3' variant="outlined" color="error" onClick={handleDelete} >
          <strong>Delete</strong>
        </Button>
        </Box>
      </Box>
      <Box className='ovr'>
        <Typography className='ovr-t'>
        Butterflies are the adult flying stage of certain insects belonging to an order or group called Lepidoptera. The word "Lepidoptera" means "scaly wings" in Greek. This name perfectly suits the insects in this group because their wings are covered with thousands of tiny scales overlapping in rows.

An agency of the Governmental Wildlife Conservation is planning to implement an automated system based on computer vision so that it can identify butterflies based on captured images. As a consultant for this project, you are responsible for developing an efficient model.

Your Task is to build an Image Classification Model using CNN that classifies to which class of weather  each image belongs to.
        </Typography>
      </Box>
    </Box>
  );
};

export default HackathonDetail;