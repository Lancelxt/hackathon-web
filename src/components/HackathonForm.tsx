import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Input,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { HackathonContext, Hackathon } from "../contexts/HackathonContext";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/HackathonDashboard.css";
import "./styles/HackathonForm.css";
import mainLogo from "../assets/icons/main_logo_with_darktext_dphi 1.svg";

const HackathonForm: React.FC = () => {
  const context = useContext(HackathonContext);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<Omit<Hackathon, "id">>({
    name: "",
    startDate: "",
    endDate: "",
    description: "",
    image: "",
    level: "Easy",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditMode = Boolean(id);
  const existingHackathon = context?.hackathons.find(
    (hack) => hack.id === Number(id)
  );

  useEffect(() => {
    if (isEditMode && existingHackathon) {
      setFormData({
        name: existingHackathon.name,
        startDate: existingHackathon.startDate,
        endDate: existingHackathon.endDate,
        description: existingHackathon.description,
        image: existingHackathon.image,
        level: existingHackathon.level,
      });
      setImagePreview(existingHackathon.image);
    }
  }, [isEditMode, existingHackathon]);

  if (!context) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const { addHackathon, updateHackathon } = context;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageChangeClick = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = formData.image;

    if (selectedFile) {
      imageUrl = await uploadImage(selectedFile);
    }

    const hackathonData: Hackathon = {
      id: isEditMode && existingHackathon ? existingHackathon.id : Date.now(),
      ...formData,
      image: imageUrl,
    };

    if (isEditMode && existingHackathon) {
      updateHackathon(hackathonData);
    } else {
      addHackathon(hackathonData);
    }

    navigate("/");
  };

  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(URL.createObjectURL(file));
      }, 1000);
    });
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <Box>
      <Box
        paddingTop={0.4}
        paddingBottom={0.4}
        paddingLeft={1}
        onClick={handleLogoClick}
      >
        <img src={mainLogo} alt="DPhi Logo" style={{ width: "88px" }} />
      </Box>
      <Box className="form-c">
        <Typography variant="h4" gutterBottom className="hdr">
          {isEditMode ? "Challenge Details" : "Challenge Details"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2} paddingLeft={10}>
            <Typography fontSize={"16px"} fontWeight={"600"} color="#333333">
              Challenge Name
            </Typography>
            <TextField
              name="name"
              variant="outlined"
              required
              value={formData.name}
              onChange={handleChange}
              className="tf"
            />
            <Typography fontSize={"16px"} fontWeight={"600"} color="#333333">
              Start Date
            </Typography>
            <TextField
              className="tf"
              name="startDate"
              type="datetime-local"
              variant="outlined"
              required
              InputLabelProps={{ shrink: true }}
              value={formData.startDate}
              onChange={handleChange}
            />
            <Typography fontSize={"16px"} fontWeight={"600"} color="#333333">
              End Date
            </Typography>
            <TextField
              className="tf"
              name="endDate"
              type="datetime-local"
              variant="outlined"
              required
              InputLabelProps={{ shrink: true }}
              value={formData.endDate}
              onChange={handleChange}
            />
            <Typography fontSize={"16px"} fontWeight={"600"} color="#333333">
              Description
            </Typography>
            <TextField
              className="tf2"
              name="description"
              variant="outlined"
              required
              multiline
              value={formData.description}
              onChange={handleChange}
              minRows={6}
            />
            <Typography fontSize={"16px"} fontWeight={"600"} color="#333333">
              Image Upload
            </Typography>
            <Box className="image-upload-container">
              {imagePreview ? (
                <Box className="image-preview-container">
                  <img
                    src={imagePreview}
                    alt="Selected file"
                    className="image-preview"
                  />
                  <Typography
                    className="change-image-text"
                    onClick={handleImageChangeClick}
                  >
                    <strong>Change Image</strong>
                  </Typography>
                </Box>
              ) : (
                <Box className="up">
                  <label htmlFor="upload-button" className="upload-label">
                    <Typography>Upload</Typography>
                  </label>
                  <label htmlFor="upload-button" className="upload-label">
                    <CloudUploadIcon className="upload-icon" />
                  </label>
                </Box>
              )}
              <Input
                id="upload-button"
                className="tf"
                type="file"
                onChange={handleFileChange}
                inputRef={fileInputRef}
                inputProps={{ accept: "image/*" }}
                style={{ display: "none" }}
              />
            </Box>
            <Typography fontSize={"16px"} fontWeight={"600"} color="#333333">
              Level Type
            </Typography>
            <FormControl variant="outlined">
              <InputLabel>Level</InputLabel>
              <Select
                className="tf3"
                name="level"
                value={formData.level}
                onChange={handleSelectChange}
                label="Level"
              >
                <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Hard">Hard</MenuItem>
              </Select>
            </FormControl>
            <Box display="flex" gap={2} marginTop={2} marginBottom={4}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                style={{ textTransform: "none" }}
              >
                {isEditMode ? "Update" : "Create"}
              </Button>
              <Button
                style={{ textTransform: "none" }}
                variant="contained"
                color="error"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default HackathonForm;
