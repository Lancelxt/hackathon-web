import React, { useContext, useState, useEffect } from 'react';
import { HackathonContext, Hackathon } from '../contexts/HackathonContext';
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Menu,
  IconButton,
  Chip,
} from '@mui/material';
import HackathonCard from './HackathonCard';
import { useNavigate } from 'react-router-dom';
import FilterListIcon from '@mui/icons-material/FilterList';
import mainLogo from '../assets/icons/main_logo_with_darktext_dphi 1.svg';
import rect from '../assets/icons/Rectangle 6699.svg';
import pics from '../assets/icons/PicsArt_04-14-04.42 1.svg';
import c1 from '../assets/icons/c1.svg';
import c2 from '../assets/icons/c2.svg';
import c3 from '../assets/icons/c3.svg';
import notebook from '../assets/icons/carbon_notebook-reference.svg';
import people from '../assets/icons/Vector.svg';
import robot from '../assets/icons/Robot.svg';
import idcard from '../assets/icons/IdentificationCard.svg';
import { Cancel } from '@mui/icons-material';

const HackathonDashboard: React.FC = () => {
  const context = useContext(HackathonContext);
  const navigate = useNavigate();

  // Initialize state hooks
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [levelFilter, setLevelFilter] = useState<string[]>([]);
  const [filteredHackathons, setFilteredHackathons] = useState<Hackathon[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Use a fallback for hackathons if context is null
  const hackathons = context?.hackathons || [];

  useEffect(() => {
    let filtered = hackathons;

    // Search
    if (searchTerm) {
      filtered = filtered.filter((hack) =>
        hack.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    const now = new Date();
    if (statusFilter.length > 0) {
      filtered = filtered.filter((hack) => {
        const hackStatus = new Date(hack.startDate) <= now && new Date(hack.endDate) >= now
          ? 'active'
          : new Date(hack.startDate) > now
          ? 'upcoming'
          : 'past';

        return statusFilter.includes('All') || statusFilter.includes(hackStatus);
      });
    }

    // Filter by level
    if (levelFilter.length > 0) {
      filtered = filtered.filter((hack) => levelFilter.includes(hack.level));
    }

    setFilteredHackathons(filtered);
  }, [hackathons, searchTerm, statusFilter, levelFilter]);

  // Handle rendering logic based on the availability of context
  if (!context) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setStatusFilter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLevelFilter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

    // Remove a selected filter
    const removeFilter = (filterType: 'status' | 'level', value: string) => {
      if (filterType === 'status') {
        setStatusFilter((prev) => prev.filter((item) => item !== value));
      } else if (filterType === 'level') {
        setLevelFilter((prev) => prev.filter((item) => item !== value));
      }
    };

    const handleLogoClick = () => {
      navigate('/');
    };

  return (
    <Box>
      <Box paddingTop={0.4} paddingBottom={0.4} paddingLeft={1} onClick={handleLogoClick}>
      <img src={mainLogo} alt="DPhi Logo" style={{ width: '88px' }} />
      </Box>
      <Box className="hero-section">
      <img src={rect} alt="rect" className='rect' />

        <Typography variant="h1" gutterBottom>
          Accelerate Innovation with Global AI Challenges
        </Typography>
        <Typography variant="body1" gutterBottom>
          AI Challenges at DPhi simulate real-world problems. It is a great place to put your AI/Data Science skills to test on diverse datasets allowing you to foster learning through competitions.
        </Typography>
        <Button className='challenge-btn' variant="contained" onClick={() => navigate('/create')} style={{ textTransform: 'none' }}>
          Create Challenge
        </Button>
      <img src={pics} alt="rect" className='pics' />

      </Box>

      <Box className="stats-section">
        <Box className="stat">
        <img src={c1} alt="Icon 1" style={{ width: '55px', height: '55px' }} />
          <Box display={'flex'} flexDirection={'column'}>
          <Typography variant="body1" fontWeight={700} fontSize="24px">
            100K+
          </Typography>
          <Typography fontSize="16px" fontWeight={500}>AI models submissions</Typography>
          </Box>
        </Box>
        <Box className="stat">
        <img src={c2} alt="Icon 2" style={{ width: '55px', height: '55px' }} />
        <Box display={'flex'} flexDirection={'column'}>
          <Typography variant="body1" fontWeight={700} fontSize="24px">
            50K+
          </Typography>
          <Typography fontSize="16px" fontWeight={500}>Data Scientists</Typography>
          </Box>
        </Box>
        <Box className="stat">
        <img src={c3} alt="Icon 3" style={{ width: '55px', height: '55px' }} />
        <Box display={'flex'} flexDirection={'column'}>
          <Typography variant="body1" fontWeight={700} fontSize="24px">
            50+
          </Typography>
          <Typography fontSize="16px" fontWeight={500}>AI Challenges hosted</Typography>
          </Box>
        </Box>
      </Box>

      <Box className="why-participate-section">
        <Typography variant="h4" gutterBottom align="center" style={{ fontSize: "32px", fontWeight: "600" }}>
          Why Participate in <span style={{color:"#109c27"}}>AI Challenges?</span>
        </Typography>
        <Box className="why-participate-container">
          <Box className="why-participate-card">
      <img src={notebook} alt="cardicon" className='cardicon' />
            <Typography variant="body1" gutterBottom>
              <span style={{ fontSize: "24px", fontWeight: "600", color: "#000000" }}>Prove your skills</span>
            </Typography>
            <Typography>
              <span style={{ fontSize: "16px", fontWeight: "500", color: "#64607D" }}>Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions.</span>
            </Typography>
          </Box>
          <Box className="why-participate-card">
      <img src={people} alt="cardicon" className='cardicon' />

            <Typography variant="body1" gutterBottom>
              <span style={{ fontSize: "24px", fontWeight: "600", color: "#000000" }}>Learn from the community</span>
            </Typography>
            <Typography>
              <span style={{ fontSize: "16px", fontWeight: "500", color: "#64607D" }}>One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them.</span>
            </Typography>
          </Box>
          <Box className="why-participate-card">
      <img src={robot} alt="cardicon" className='cardicon' />

            <Typography variant="body1" gutterBottom>
              <span style={{ fontSize: "24px", fontWeight: "600", color: "#000000" }}>Challenge yourself</span>
            </Typography>
            <Typography>
              <span style={{ fontSize: "16px", fontWeight: "500", color: "#64607D" }}>There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder.</span>
            </Typography>
          </Box>
          <Box className="why-participate-card">
      <img src={idcard} alt="cardicon" className='cardicon' />

            <Typography variant="body1" gutterBottom>
              <span style={{ fontSize: "24px", fontWeight: "600", color: "#000000" }}>Earn recognition</span>
            </Typography>
            <Typography>
              <span style={{ fontSize: "16px", fontWeight: "500", color: "#64607D" }}>You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards.</span>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className="explore-challenges-section">
        <Typography fontSize={'28px'} fontWeight={'600'} color='#FFFFFF' gutterBottom align="center">
          Explore Challenges
        </Typography>
        <Box className="explore-challenges-search" display="flex" alignItems="center" gap={2}>
          <TextField
            // label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Box className="filter-section">
            <IconButton onClick={handleFilterClick} color="default">
              <FilterListIcon />
              Filter
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleFilterClose}
            >
              <Box className='filter-container' padding={2}>
                <Typography variant="h6" gutterBottom>Status</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={statusFilter.includes('All')}
                      onChange={() => setStatusFilter(statusFilter.includes('All') ? [] : ['All'])}
                      value="All"
                    />
                  }
                  label="All"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={statusFilter.includes('active')}
                      onChange={handleStatusChange}
                      value="active"
                    />
                  }
                  label="Active"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={statusFilter.includes('upcoming')}
                      onChange={handleStatusChange}
                      value="upcoming"
                    />
                  }
                  label="Upcoming"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={statusFilter.includes('past')}
                      onChange={handleStatusChange}
                      value="past"
                    />
                  }
                  label="Past"
                />
                <Box marginTop={2}>
                  <Typography variant="h6" gutterBottom>Levels</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={levelFilter.includes('Easy')}
                        onChange={handleLevelChange}
                        value="Easy"
                      />
                    }
                    label="Easy"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={levelFilter.includes('Medium')}
                        onChange={handleLevelChange}
                        value="Medium"
                      />
                    }
                    label="Medium"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={levelFilter.includes('Hard')}
                        onChange={handleLevelChange}
                        value="Hard"
                      />
                    }
                    label="Hard"
                  />
                </Box>
              </Box>
            </Menu>
          </Box>
          {/* Display selected filters */}
        
        </Box>
        <Box display="flex" gap={1} flexWrap="wrap" marginTop={4} paddingLeft={60}>
          {statusFilter.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              onDelete={() => removeFilter('status', filter)}
              deleteIcon={<Cancel />}
              color="primary"
            />
          ))}
          {levelFilter.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              onDelete={() => removeFilter('level', filter)}
              deleteIcon={<Cancel />}
              color="secondary"
            />
          ))}
        </Box>
        <Box display="flex" flexWrap="wrap" gap={6.2} marginTop={20} className='card-container'>
          {filteredHackathons.map((hackathon) => (
            <Box key={hackathon.id} flexBasis={{ xs: "100%", sm: "48%", md: "31%" }}>
              <HackathonCard hackathon={hackathon} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HackathonDashboard;
