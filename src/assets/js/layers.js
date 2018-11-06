import moment from 'moment';
// import essReceptionCentersURL from '../images/eSSReceptionCenters.geojson';

// Import the URL to an image file
import cameraPointURL from '../images/video-solid.png';
import firePointURL from '../images/fire-point.svg';
import shelterPointURL from '../images/shelter-point.svg';

const firePoint = `
<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
<g fill="none" fill-rule="evenodd">
  <path fill-opacity=".01" fill="#FFF" d="M0 0h40v40H0z"/>
  <path d="M38 20c0-9.941-8.059-18-18-18S2 10.059 2 20s8.059 18 18 18a18 18 0 0 0 18-18" fill="#FFF" fill-rule="nonzero"/>
  <path d="M38 20c0-9.941-8.059-18-18-18S2 10.059 2 20s8.059 18 18 18c.395 0 .788-.017 1.177-.042C17 31.59 10.56 31.628 10.56 24.835c0-7.873 14.518-6.15 11.107-18.378 13.033 13.625-.07 14.168-.07 20.728 0 5.28 2.935 5.925 2.435 10.355A18 18 0 0 0 38 20" fill="#F4805E" fill-rule="nonzero"/>
</g>
</svg>`;

const allFirePoints = `
<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
    <path fill-opacity=".01" fill="#FFF" d="M0 0h40v40H0z"/>
    <path d="M38 20c0-9.941-8.059-18-18-18S2 10.059 2 20s8.059 18 18 18a18 18 0 0 0 18-18" fill="#FFF" fill-rule="nonzero"/>
    <path d="M31.176 34.111a17.917 17.917 0 0 1-8.465 3.686c2.106-6.313-1.632-6.104-1.632-11.587 0-5.765 11.959-6.24.06-18.21C24.253 18.741 11 17.228 11 24.146c0 6.668 7.33 5.838 10.951 13.75-.64.069-1.292.104-1.951.104-9.941 0-18-8.059-18-18S10.059 2 20 2s18 8.059 18 18c0 4.943-1.993 9.421-5.219 12.674-.061-2.133-1.617-2.749-1.617-5.732 0-4.102 8.51-4.44.043-12.958 2.216 7.643-7.215 6.566-7.215 11.49 0 4.395 4.477 4.212 7.184 8.637zM9.764 28.263c1.548-3.974-.678-3.69-.678-6.796 0-3.106 6.443-3.362.032-9.812 1.678 5.788-5.463 4.972-5.463 8.7 0 3.727 4.252 3.106 6.112 7.908h-.003z" fill="#F4805E"/>
  </g>
</svg>`;

const allFirePerimeters = `
<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
    <path fill-opacity=".01" fill="#FFF" d="M0 0h40v40H0z"/>
    <path d="M38 20c0-9.941-8.059-18-18-18S2 10.059 2 20s8.059 18 18 18a18 18 0 0 0 18-18" fill="#FECC5C" fill-rule="nonzero"/>
    <path d="M31.176 34.111a17.917 17.917 0 0 1-8.465 3.686c2.106-6.313-1.632-6.104-1.632-11.587 0-5.765 11.959-6.24.06-18.21C24.253 18.741 11 17.228 11 24.146c0 6.668 7.33 5.838 10.951 13.75-.64.069-1.292.104-1.951.104-9.941 0-18-8.059-18-18S10.059 2 20 2s18 8.059 18 18c0 4.943-1.993 9.421-5.219 12.674-.061-2.133-1.617-2.749-1.617-5.732 0-4.102 8.51-4.44.043-12.958 2.216 7.643-7.215 6.566-7.215 11.49 0 4.395 4.477 4.212 7.184 8.637z" fill="#F4805E"/>
    <path d="M9.764 28.263c1.548-3.974-.678-3.69-.678-6.796 0-3.106 6.443-3.362.032-9.812 1.678 5.788-5.463 4.972-5.463 8.7 0 3.727 4.252 3.106 6.112 7.908" stroke="#AC0015" fill="#FECC5C" stroke-linecap="round"/>
    <path d="M22.904 37.313c2.083-6.28-1.825-5.63-1.825-11.103 0-5.765 11.959-6.24.06-18.21C24.253 18.741 11 17.228 11 24.146c0 6.654 7.057 5.433 10.686 13.291" stroke="#AC0015" stroke-linecap="round"/>
    <path d="M32.6 32.162c-.162-1.952-1.436-2.346-1.436-5.22 0-4.102 8.51-4.44.043-12.958 2.216 7.643-7.215 6.566-7.215 11.49 0 4.348 4.199 3.943 6.914 8.224" stroke="#AC0015" stroke-linecap="round"/>
  </g>
</svg>`;

const firePerimeter = `
<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
    <path fill-opacity=".01" fill="#FFF" d="M0 0h40v40H0z"/>
    <path d="M38 20c0-9.941-8.059-18-18-18S2 10.059 2 20s8.059 18 18 18a18 18 0 0 0 18-18" fill="#FECC5C" fill-rule="nonzero"/>
    <path d="M24.106 37.53C32.068 35.672 38 28.529 38 20c0-9.941-8.059-18-18-18S2 10.059 2 20s8.059 18 18 18c.289 0 .576-.007.86-.02C16.48 31.782 10 31.704 10 24.858 10 16.778 25.158 18.545 21.597 6c13.61 13.98-.069 14.535-.069 21.267 0 5.274 2.9 6.04 2.578 10.263z" fill="#F4805E"/>
    <path d="M24.13 37.036v-.119c.013-3.7-2.602-4.642-2.602-9.65 0-6.732 13.678-7.287.07-21.267C25.157 18.545 10 16.777 10 24.858c0 6.05 5.06 6.814 9.26 11.186.486.507.96.873 1.459 1.452" stroke="#AC0015" stroke-linecap="round"/>
  </g>
</svg>`;

const airQuality = `
<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
    <path fill-opacity=".01" fill="#FFF" d="M0 0h40v40H0z"/>
    <path d="M38 20c0-9.941-8.059-18-18-18S2 10.059 2 20s8.059 18 18 18a18 18 0 0 0 18-18" fill="#FFF" fill-rule="nonzero"/>
    <path d="M18.351 2.055C9.201 2.769 2 10.42 2 19.753c0 9.805 7.948 17.754 17.753 17.754a17.753 17.753 0 0 0 17.754-17.754c0-9.494-7.454-17.248-16.829-17.73v12.024c0 .259.13.501.346.645l1.594 1.063V12.84c0-1.76 1.52-3.186 3.396-3.186 2.132 0 2.809 1.385 3.881 3.061a39.82 39.82 0 0 1 4.946 11.2c.126.47.189.953.189 1.438 0 2.968-3.03 5.112-6.072 4.296l-2.885-.773c-2.045-.549-3.455-2.302-3.455-4.297l-.012-6.125-3.091-2.05-3.103 2.05v6.125c0 1.995-1.41 3.749-3.455 4.297l-2.885.773C7.03 30.465 4 28.321 4 25.353c0-.485.063-.967.189-1.437a39.82 39.82 0 0 1 4.945-11.2c1.073-1.677 1.75-3.062 3.882-3.062 1.875 0 3.396 1.427 3.396 3.186v2.915l1.594-1.063a.776.776 0 0 0 .345-.645V2.055z" fill="#A0A7AC"/>
  </g>
</svg>`;

const trafficCamera = `
<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
    <path fill-opacity=".01" fill="#FFF" d="M0 0h40v40H0z"/>
    <path d="M38 20c0-9.941-8.059-18-18-18S2 10.059 2 20s8.059 18 18 18a18 18 0 0 0 18-18" fill="#FFF" fill-rule="nonzero"/>
    <path d="M37.752 19.876a17.876 17.876 0 0 1-17.876 17.876C10.003 37.752 2 29.748 2 19.876 2 10.003 10.003 2 19.876 2c9.872 0 17.876 8.003 17.876 17.876zM23.08 11.703H11.363c-1.072 0-1.941.87-1.941 1.942v11.716c0 1.073.869 1.942 1.941 1.942H23.08c1.072 0 1.942-.87 1.942-1.942V13.645c0-1.072-.87-1.942-1.942-1.942zm7.694 1.532l-4.452 3.071V22.7l4.452 3.068c.861.593 2.048-.013 2.048-1.049V14.283c0-1.032-1.183-1.641-2.048-1.048z" fill="#AC997C"/>
  </g>
</svg>`;

const fireDanger = `
<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
    <path fill-opacity=".01" fill="#FFF" d="M0 0h40v40H0z"/>
    <path d="M22.597 5.5c-1.15-2-4.043-2-5.2 0L2.405 31.498c-1.15 1.994.287 4.5 2.6 4.5h29.991c2.307 0 3.75-2.5 2.6-4.5L22.597 5.5z" fill="#FFF"/>
    <path d="M22.904 35.998h12.092c2.307 0 3.75-2.5 2.6-4.5L22.597 5.5c-1.15-2-4.043-2-5.2 0L2.405 31.498c-1.15 1.994.287 4.5 2.6 4.5h14.039c-3.807-4.331-8.677-4.836-8.677-10.428 0-7.171 13.454-5.602 10.293-16.737 12.079 12.408-.061 12.9-.061 18.876 0 4.318 2.19 5.23 2.305 8.29z" fill="#F4805E" fill-rule="nonzero"/>
  </g>
</svg>`;

export const navigationDefinitions = [
  {
    isGroupControl: true,
    id: 'bc-evacuation-orders',
    active: true,
    icon: `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <path fill-opacity=".01" fill="#FFFFFF" d="M0 0h40v40H0z"/>
        <path d="M22.888 36.44c-1.278 2.223-4.493 2.223-5.778 0L.451 7.553c-1.277-2.215.32-5 2.89-5h33.324c2.562 0 4.166 2.778 2.888 5L22.888 36.44z" fill-opacity=".7" fill="#C00177" fill-rule="nonzero"/>
        <path d="M22.888 36.44c-1.278 2.223-4.493 2.223-5.778 0L.451 7.553c-1.277-2.215.32-5 2.89-5h33.324c2.562 0 4.166 2.778 2.888 5L22.888 36.44zM3.333 5.887L20 34.774 36.665 5.887H3.333z" fill="#C00177" fill-rule="nonzero"/>
        <path d="M20.077 11.615a2.308 2.308 0 1 0 0-4.615 2.308 2.308 0 0 0 0 4.615zm-7.611 10.648l-.712 1.66H8.538a1.539 1.539 0 0 0 0 3.077h3.724c.925 0 1.759-.55 2.12-1.399l.423-.987-.513-.302a4.578 4.578 0 0 1-1.826-2.049zm12.996-4.494h-2.117l-1.253-2.56c-.601-1.229-1.704-2.127-2.97-2.45l-3.418-1.016a4.596 4.596 0 0 0-3.886.824L9.91 14.03a1.537 1.537 0 1 0 1.872 2.442l1.908-1.462c.369-.284.838-.385 1.215-.296l.707.21-1.801 4.202a3.085 3.085 0 0 0 1.264 3.861l4.086 2.412-1.321 4.218a1.538 1.538 0 1 0 2.936.92l1.521-4.86a2.317 2.317 0 0 0-1.04-2.614l-2.945-1.738 1.506-3.763.974 1.991a2.322 2.322 0 0 0 2.073 1.293h2.596a1.539 1.539 0 0 0 0-3.076zM24 12.01V9.293c0-.376.303-.678.679-.678h5.655V5.68a.68.68 0 0 1 1.16-.481l4.977 4.971a.68.68 0 0 1 0 .962L31.494 16.1a.68.68 0 0 1-1.16-.48v-2.933H24.68a.677.677 0 0 1-.679-.679z" fill="#FFFFFF" fill-rule="nonzero"/>
      </g>
    </svg>`,
    label: 'Evacuation Order',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: true,
    id: 'bc-evacuation-alerts',
    active: true,
    icon: `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <path fill-opacity=".01" fill="#FFFFFF" d="M0 0h40v40H0z"/>
        <path d="M38 20c0-9.941-8.059-18-18-18S2 10.059 2 20s8.059 18 18 18a18 18 0 0 0 18-18" fill-opacity=".7" fill="#C00177" fill-rule="nonzero"/>
        <path d="M38 20a18 18 0 0 1-18 18c-9.941 0-18-8.059-18-18S10.059 2 20 2s18 8.059 18 18zm-3 0c0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15a15 15 0 0 0 15-15z" fill="#C00177" fill-rule="nonzero"/>
        <path d="M19.614 7a3.076 3.076 0 1 1 0 6.153 3.076 3.076 0 0 1 0-6.153zm2.308 6.922h-.546a4.224 4.224 0 0 1-3.523 0h-.546A2.307 2.307 0 0 0 15 16.229v6.537c0 .637.516 1.153 1.154 1.153h.769v6.537c0 .638.516 1.154 1.153 1.154h3.077c.637 0 1.153-.516 1.153-1.154V23.92h.77c.636 0 1.153-.516 1.153-1.153v-6.537a2.307 2.307 0 0 0-2.307-2.307zM31.323 17.2a2.635 2.635 0 0 1-2.632 2.633 2.635 2.635 0 0 1-2.632-2.632 2.635 2.635 0 0 1 2.632-2.632 2.635 2.635 0 0 1 2.632 2.632zm-4.96-13.382l.448 8.948a.79.79 0 0 0 .789.75h2.182a.79.79 0 0 0 .789-.75l.447-8.948a.79.79 0 0 0-.789-.83h-3.077a.79.79 0 0 0-.788.83z" fill="#FFFFFF" fill-rule="nonzero"/>
      </g>
    </svg>`,
    label: 'Evacuation Alert',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: true,
    id: 'bc-evacuation-all-clear',
    active: true,
    icon: `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <path fill-opacity=".01" fill="#FFFFFF" d="M0 0h40v40H0z"/>
        <path d="M34.143 2H5.857A3.858 3.858 0 0 0 2 5.857v28.286A3.858 3.858 0 0 0 5.857 38h28.286A3.858 3.858 0 0 0 38 34.143V5.857A3.858 3.858 0 0 0 34.143 2z" fill-opacity=".7" fill="#F768A1" fill-rule="nonzero"/>
        <path d="M34.143 2H5.857A3.858 3.858 0 0 0 2 5.857v28.286A3.858 3.858 0 0 0 5.857 38h28.286A3.858 3.858 0 0 0 38 34.143V5.857A3.858 3.858 0 0 0 34.143 2zm-.482 32.143H6.339a.484.484 0 0 1-.482-.482V6.339c0-.265.217-.482.482-.482h27.322c.265 0 .482.217.482.482v27.322a.484.484 0 0 1-.482.482z" fill="#F768A1" fill-rule="nonzero"/>
        <path d="M16.296 11.433a2.328 2.328 0 1 1 .001-4.657 2.328 2.328 0 0 1-.001 4.657zm-4.583 7.23l1.13-.572.47-1.426c.713-2.163 2.702-3.676 4.957-3.68 1.746-.005 2.71.49 4.524 1.222a4.626 4.626 0 0 1 2.41 2.24l.325.66a1.557 1.557 0 0 1-.688 2.08 1.53 1.53 0 0 1-2.061-.693l-.325-.66a1.541 1.541 0 0 0-.8-.747l-1.3-.524.737 2.944a3.114 3.114 0 0 1-.722 2.852l-2.905 3.171a3.13 3.13 0 0 0-.723 1.343l-.887 3.555a1.555 1.555 0 0 1-1.882 1.13 1.555 1.555 0 0 1-1.13-1.882l1.077-4.316c.126-.5.373-.965.722-1.343l2.207-2.41-.834-3.332-.267.8a3.093 3.093 0 0 1-1.537 1.795l-1.13.572a1.53 1.53 0 0 1-2.061-.693 1.57 1.57 0 0 1 .693-2.086zm11.1 6.823c.156.393.389.747.69 1.043l2.424 2.43c.606.606.606 1.59 0 2.196a1.548 1.548 0 0 1-2.192 0l-2.88-2.88a3.152 3.152 0 0 1-.69-1.043l-.654-1.639c2.682-2.924 1.877-2.027 2.299-2.604l1.004 2.497zM39 13.298v-3.214a.802.802 0 0 0-.803-.803H31.5V5.806c0-.717-.864-1.075-1.373-.57l-5.892 5.886a.804.804 0 0 0 0 1.138l5.892 5.882c.506.506 1.373.148 1.373-.569v-3.471h6.696a.802.802 0 0 0 .803-.804z" fill="#FFFFFF" fill-rule="nonzero"/>
      </g>
    </svg>`,
    label: 'Evacuation All Clear',
    loadState: '',
    navigation: true,
  },
  // {
  //   isGroupControl: true,
  //   id: 'bc-shelters',
  //   active: false,
  //   icon: `
  //   <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
  //     <g fill="none" fill-rule="evenodd">
  //       <path fill-opacity=".01" fill="#FFFFFF" d="M0 0h40v40H0z"/>
  //       <path d="M38 20c0-9.941-8.059-18-18-18S2 10.059 2 20s8.059 18 18 18a18 18 0 0 0 18-18" fill="#FFFFFF" fill-rule="nonzero"/>
  //       <path d="M13.938 36.954V31.75h.624c.518 0 .938-.42.938-.938V25.5c0-1.036-.84-1.875-1.875-1.875h-.444a3.433 3.433 0 0 1-2.862 0h-.444C8.839 23.625 8 24.465 8 25.5v5.313c0 .517.42.937.938.937h.624v2.917C4.986 31.403 2 26.05 2 20c0-9.941 8.059-18 18-18s18 8.059 18 18a18 18 0 0 1-6.913 14.18v-2.43h.625c.518 0 .937-.42.937-.938V25.5c0-1.036-.84-1.875-1.875-1.875h-.443a3.433 3.433 0 0 1-2.863 0h-.444c-1.035 0-1.875.84-1.875 1.875v5.313c0 .517.42.937.938.937h.625v4.952a17.998 17.998 0 0 1-4.754 1.191v-2.726h.417c.345 0 .625-.28.625-.625V31c0-.69-.56-1.25-1.25-1.25h-.296a2.289 2.289 0 0 1-1.908 0h-.296c-.69 0-1.25.56-1.25 1.25v3.542c0 .345.28.625.625.625h.417v2.808a17.927 17.927 0 0 1-5.105-1.021zM20.5 26a1.667 1.667 0 1 0 0 3.333 1.667 1.667 0 0 0 0-3.333zm8.4-8a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm-17.15 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM21.799 4.646a2.83 2.83 0 0 0-3.601 0L3.256 16.955a.71.71 0 0 0-.094.998l1.505 1.83a.71.71 0 0 0 .998.094L19.55 8.442a.72.72 0 0 1 .903 0l13.885 11.435a.71.71 0 0 0 .997-.094l1.506-1.83a.71.71 0 0 0-.1-.998L21.798 4.646z" fill="#F995BD" fill-rule="nonzero"/>
  //     </g>
  //   </svg>`,
  //   label: 'ESS Reception Centers',
  //   loadState: '',
  //   navigation: true,
  // },
  {
    isGroupControl: true,
    id: 'drive-bc-traffic-conditions',
    active: true,
    icon: `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <path fill-opacity=".01" fill="#FFFFFF" d="M0 0h40v40H0z"/>
        <path d="M38 20c0-9.941-8.059-18-18-18S2 10.059 2 20s8.059 18 18 18a18 18 0 0 0 18-18" fill="#FFFFFF" fill-rule="nonzero"/>
        <path d="M25.434 36.866a17.874 17.874 0 0 0 12.318-16.99C37.752 10.003 29.748 2 19.876 2 10.003 2 2 10.003 2 19.876c0 8.075 5.354 14.9 12.706 17.117a8.005 8.005 0 0 1-2.52-4.302C9.767 31.918 8 29.677 8 27h4v-2.367C9.675 23.806 8 21.608 8 19h4v-2.367C9.675 15.806 8 13.608 8 11h4V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2h4c0 2.609-1.675 4.806-4 5.633V19h4c0 2.609-1.675 4.806-4 5.633V27h4c0 2.677-1.766 4.918-4.187 5.69a8.003 8.003 0 0 1-2.379 4.176z" fill="#AC997C"/>
        <path d="M20 33a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM20 25a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM20 17a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="#AC997C"/>
      </g>
    </svg>`,
    label: 'DriveBC Traffic',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: true,
    id: 'fire-perimeters',
    active: true,
    icon: allFirePerimeters,
    label: 'All Fire Perimiters',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: false,
    id: 'bc-active-fire-perimeters',
    groupControlId: 'fire-perimeters',
    active: true,
    opacity: 1,
    icon: firePerimeter,
    label: 'BC Fire Perimeters',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: false,
    id: 'us-active-fire-perimeters',
    groupControlId: 'fire-perimeters',
    active: true,
    opacity: 1,
    icon: firePerimeter,
    label: 'US Fire Perimeters',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: true,
    id: 'fire-points',
    active: true,
    icon: allFirePoints,
    label: 'All Fire Points',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: false,
    id: 'bc-active-fire-points',
    groupControlId: 'fire-points',
    active: true,
    opacity: 1,
    icon: firePoint,
    label: 'BC Fire Points',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: false,
    id: 'ab-active-fire-points',
    groupControlId: 'fire-points',
    active: true,
    opacity: 1,
    icon: firePoint,
    label: 'AB Fire Points',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: false,
    id: 'us-large-fire-points',
    groupControlId: 'fire-points',
    active: true,
    opacity: 1,
    icon: firePoint,
    label: 'US Fire Points',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: false,
    id: 'modis-satellite',
    groupControlId: 'fire-points',
    active: false,
    opacity: 1,
    icon: `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd">
        <path fill-opacity=".01" fill="#FFF" d="M0 0h40v40H0z"/>
        <path d="M38 20c0-9.941-8.059-18-18-18S2 10.059 2 20s8.059 18 18 18a18 18 0 0 0 18-18" fill="#FFF" fill-rule="nonzero"/>
        <path d="M28.688 35.764A17.999 17.999 0 0 1 20 38c-7.34 0-13.655-4.394-16.456-10.696l5.522-5.524.648-1.501-2.405-2.405-1.516.634-3.663 3.664A18.184 18.184 0 0 1 2 20c0-9.941 8.059-18 18-18s18 8.059 18 18a18 18 0 0 1-6.864 14.142c-.185-.502-.32-1.101-.32-1.912 0-3.396 6.9-3.676.034-10.728C32.647 27.83 25 26.939 25 31.015c0 2.589 1.837 3.259 3.688 4.75zM16.978 12.99l1.515-.635 6.51-6.51-3.272-3.274-6.51 6.512-.648 1.502 2.405 2.405zM6.412 14.749a.968.968 0 0 0 0 1.364l5.05 5.05a.968.968 0 0 0 1.365 0l5.05-5.05a.967.967 0 0 0 0-1.364l-5.05-5.05a.967.967 0 0 0-1.364 0l-5.05 5.05zm14.002 3.638a6.725 6.725 0 0 1-5.96 6.099l.201 2.058a8.788 8.788 0 0 0 7.82-7.955l-2.061-.202zm4.15.437a10.797 10.797 0 0 1-9.74 9.744l.2 2.057c6.144-.564 11.033-5.455 11.6-11.6l-2.06-.2z" fill="#F4805E" fill-rule="nonzero"/>
        </g>
    </svg>`,
    label: 'Satellite Fire Sensor',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: false,
    id: 'ospo-noaa-smoke',
    active: false,
    opacity: 1,
    icon: `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <path fill-opacity=".01" fill="#FFF" d="M0 0h40v40H0z"/>
        <path d="M38 20c0-9.941-8.059-18-18-18S2 10.059 2 20s8.059 18 18 18a18 18 0 0 0 18-18" fill="#FFF" fill-rule="nonzero"/>
        <path d="M9.763 34.808c-.37-.256-.729-.526-1.078-.808h.087v-3.981c0-2.07 1.273-3.408 3.725-3.408H17.091c2.597 0 3.65-2.926 2.79-4.957.355.08.725.128 1.105.128 2.788 0 5.047-2.32 5.047-5.182 0-2.864-2.26-5.184-5.047-5.184-2.003 0-3.729 1.201-4.544 2.938-2.195.602-3.573 2.475-3.573 4.682 0 1.04.38 2.301 1.151 3.394h-2.715c-3.95 0-6.306 3.377-6.305 6.764v.76C3.104 27.101 2 23.68 2 20c0-9.941 8.059-18 18-18s18 8.059 18 18a18 18 0 0 1-18 18c-1.614 0-3.178-.212-4.666-.61v-4.75c.007-.829.236-1.359.628-1.737.394-.375 1.053-.656 2.113-.658 0-.002 4.585-.002 4.623-.002 1.271 0 2.351-.596 3.024-1.45.687-.86 1.017-2.99 1.018-4.068 0-.242-.021-.485-.056-.727.255.049.517.079.785.079 2.312 0 4.185-1.925 4.185-4.298 0-1.068-.38-2.042-1.016-2.863a6.18 6.18 0 0 0 1.14-3.585c0-3.373-2.664-6.11-5.95-6.11-2.267 0-4.234 1.303-5.238 3.218a5.75 5.75 0 0 1 .396-.014c3.33 0 6.04 2.77 6.04 6.176 0 3.346-2.618 6.079-5.872 6.17.08 1.075-.182 2.179-.768 3.065-.754 1.139-1.925 1.767-3.295 1.767h-4.594c-1.814 0-2.734.813-2.734 2.416v4.789zm2.6-13.37c-.317-.793-.487-1.62-.486-2.402 0-1.63.614-3.08 1.673-4.133a4.563 4.563 0 0 0-1.263-.182c-2.652 0-4.803 2.207-4.803 4.93 0 .917.251 1.77.677 2.505a7.026 7.026 0 0 1 3.144-.718h1.058z" fill="#A0A7AC" fill-rule="nonzero"/>
      </g>
    </svg>`,
    label: 'OSPO NOAA Smoke Live',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: false,
    id: 'nws-experimental-smoke',
    active: true,
    opacity: 0.5,
    icon: `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <path fill-opacity=".01" fill="#FFF" d="M0 0h40v40H0z"/>
        <path d="M38 20c0-9.941-8.059-18-18-18S2 10.059 2 20s8.059 18 18 18a18 18 0 0 0 18-18" fill="#FBCF62" fill-rule="nonzero"/>
        <path d="M9.763 34.808c-.37-.256-.729-.526-1.078-.808h.087v-3.981c0-2.07 1.273-3.408 3.725-3.408H17.091c2.597 0 3.65-2.926 2.79-4.957.355.08.725.128 1.105.128 2.788 0 5.047-2.32 5.047-5.182 0-2.864-2.26-5.184-5.047-5.184-2.003 0-3.729 1.201-4.544 2.938-2.195.602-3.573 2.475-3.573 4.682 0 1.04.38 2.301 1.151 3.394h-2.715c-3.95 0-6.306 3.377-6.305 6.764v.76C3.104 27.101 2 23.68 2 20c0-9.941 8.059-18 18-18s18 8.059 18 18a18 18 0 0 1-18 18c-1.614 0-3.178-.212-4.666-.61v-4.75c.007-.829.236-1.359.628-1.737.394-.375 1.053-.656 2.113-.658 0-.002 4.585-.002 4.623-.002 1.271 0 2.351-.596 3.024-1.45.687-.86 1.017-2.99 1.018-4.068 0-.242-.021-.485-.056-.727.255.049.517.079.785.079 2.312 0 4.185-1.925 4.185-4.298 0-1.068-.38-2.042-1.016-2.863a6.18 6.18 0 0 0 1.14-3.585c0-3.373-2.664-6.11-5.95-6.11-2.267 0-4.234 1.303-5.238 3.218a5.75 5.75 0 0 1 .396-.014c3.33 0 6.04 2.77 6.04 6.176 0 3.346-2.618 6.079-5.872 6.17.08 1.075-.182 2.179-.768 3.065-.754 1.139-1.925 1.767-3.295 1.767h-4.594c-1.814 0-2.734.813-2.734 2.416v4.789zm2.6-13.37c-.317-.793-.487-1.62-.486-2.402 0-1.63.614-3.08 1.673-4.133a4.563 4.563 0 0 0-1.263-.182c-2.652 0-4.803 2.207-4.803 4.93 0 .917.251 1.77.677 2.505a7.026 7.026 0 0 1 3.144-.718h1.058z" fill="#A0A7AC" fill-rule="nonzero"/>
      </g>
    </svg>`,
    label: 'Experimental NWS Smoke',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: false,
    id: 'world-air-quality',
    active: false,
    opacity: 1,
    icon: airQuality,
    label: 'Realtime World Air Quality',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: false,
    id: 'berkley-earth-air-quality',
    active: true,
    opacity: 0.25,
    icon: airQuality,
    label: 'Berkley Earth Air Quality',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: false,
    id: 'cdn-current-weather',
    active: false,
    opacity: 1,
    icon: `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <path fill-opacity=".01" fill="#FFF" d="M0 0h40v40H0z"/>
        <path d="M38 20c0-9.941-8.059-18-18-18S2 10.059 2 20s8.059 18 18 18a18 18 0 0 0 18-18" fill="#FFF" fill-rule="nonzero"/>
        <path d="M7.424 32.704c.103.007.206.01.31.01h11.834a3.945 3.945 0 0 0 3.945-3.944c0-2.065-1.592-3.74-3.612-3.911.283-.473.456-1.02.456-1.612a3.156 3.156 0 0 0-3.156-3.156c-.849 0-1.616.34-2.183.884-.806-1.46-2.342-2.462-4.129-2.462a4.734 4.734 0 0 0-4.733 4.734c0 .096.022.186.028.281a4.758 4.758 0 0 0-2.856 2.728 17.841 17.841 0 0 1-1.08-6.132c0-9.872 8.004-17.876 17.876-17.876C29.997 2.248 38 10.252 38 20.124A17.876 17.876 0 0 1 20.124 38a17.82 17.82 0 0 1-12.7-5.296zm24.468-12.767a.84.84 0 0 1 0-1.27l2.34-2.027c.63-.545.289-1.58-.542-1.642l-3.037-.23a.82.82 0 0 1-.734-1.008l.737-3.08c.192-.803-.688-1.432-1.385-.99l-2.589 1.64a.803.803 0 0 1-1.176-.381L24.35 8.053a.911.911 0 0 0-1.702 0l-1.153 2.884a.814.814 0 0 1-1.192.385L17.724 9.69c-.697-.441-1.577.188-1.384.99l.737 3.08a.82.82 0 0 1-.735 1.008l-3.015.229c-.838.063-1.183 1.107-.548 1.658l1.54 1.333c.386.255.75.543 1.074.88a4.695 4.695 0 0 1 1.794-.354c.294 0 .58.035.86.087.35-2.711 2.647-4.82 5.451-4.82a5.529 5.529 0 0 1 5.523 5.522 5.529 5.529 0 0 1-5.523 5.523c-.047 0-.09-.013-.136-.014.682.65 1.213 1.453 1.487 2.38h1.332c.308 0 .61.09.868.26l2.223 1.464c.7.443 1.572-.206 1.376-1.024l-.724-3.027a.837.837 0 0 1 .75-1.029l3.016-.228c.83-.064 1.172-1.098.543-1.642l-2.34-2.028zM21.9 22.893a3.91 3.91 0 0 0 1.614.354 3.95 3.95 0 0 0 3.944-3.945 3.95 3.95 0 0 0-3.944-3.944 3.943 3.943 0 0 0-3.933 3.82 4.71 4.71 0 0 1 2.32 3.715z" fill="#AC997C" fill-rule="nonzero"/>
      </g>
    </svg>`,
    label: 'Cdn Current Weather',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: true,
    id: 'traffic-cameras',
    active: false,
    icon: `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <path fill-opacity=".01" fill="#FFF" d="M0 0h40v40H0z"/>
        <path d="M37.752 19.876C37.752 10.003 29.748 2 19.876 2 10.003 2 2 10.003 2 19.876c0 9.872 8.003 17.876 17.876 17.876a17.876 17.876 0 0 0 17.876-17.876" fill="#AC997C"/>
        <path d="M14.11 10h-6.1A1.01 1.01 0 0 0 7 11.01v6.1c0 .559.453 1.011 1.01 1.011h6.1a1.01 1.01 0 0 0 1.011-1.01v-6.1A1.01 1.01 0 0 0 14.111 10zm4.006.797l-2.318 1.6v3.328l2.318 1.597c.449.309 1.066-.006 1.066-.546v-5.433c0-.537-.615-.854-1.066-.546zM28.88 15h-6.76A1.12 1.12 0 0 0 21 16.12v6.76c0 .618.502 1.12 1.12 1.12h6.76A1.12 1.12 0 0 0 30 22.88v-6.76A1.12 1.12 0 0 0 28.88 15zm4.439.884l-2.569 1.771v3.69l2.569 1.77c.497.341 1.181-.008 1.181-.606v-6.02c0-.596-.682-.948-1.181-.605zM17.129 25H11.87a.871.871 0 0 0-.871.871v5.258c0 .48.39.871.871.871h5.258c.48 0 .871-.39.871-.871V25.87a.871.871 0 0 0-.871-.871zm3.452.687l-1.998 1.378v2.87l1.998 1.376c.387.266.919-.006.919-.47v-4.683c0-.463-.53-.737-.919-.47z" fill="#FFF" fill-rule="nonzero"/>
      </g>
    </svg>`,
    label: 'All Traffic Cameras',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: false,
    id: 'bc-traffic-cameras',
    groupControlId: 'traffic-cameras',
    active: false,
    opacity: 1,
    icon: trafficCamera,
    label: 'BC Cameras',
    loadState: '',
    navigation: false,
  },
  {
    isGroupControl: false,
    id: 'idt-cameras',
    groupControlId: 'traffic-cameras',
    active: false,
    opacity: 1,
    icon: trafficCamera,
    label: 'Idaho Cameras',
    loadState: '',
    navigation: false,
  },
  {
    isGroupControl: false,
    id: 'wsdot-cameras',
    groupControlId: 'traffic-cameras',
    active: false,
    opacity: 1,
    icon: trafficCamera,
    label: 'Washington Cameras',
    loadState: '',
    navigation: false,
  },
  {
    isGroupControl: false,
    id: 'odot-cameras',
    groupControlId: 'traffic-cameras',
    active: false,
    opacity: 1,
    icon: trafficCamera,
    label: 'Oregon Cameras',
    loadState: '',
    navigation: false,
  },
  {
    isGroupControl: false,
    id: 'caltrans-cameras',
    groupControlId: 'traffic-cameras',
    active: false,
    style: 'highwaycams',
    opacity: 1,
    icon: trafficCamera,
    label: 'California Cameras',
    loadState: '',
    navigation: false,
  },
  {
    isGroupControl: false,
    id: 'canadian-fire-danger',
    serverType: 'geoserver',
    active: false,
    opacity: 0.25,
    icon: fireDanger,
    label: 'Cdn Fire Danger',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: false,
    id: 'us-fire-danger',
    active: false,
    opacity: 0.25,
    icon: fireDanger,
    label: 'US Fire Danger',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: false,
    id: 'noaa-radar',
    active: false,
    opacity: 0.75,
    icon: `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <path fill-opacity=".01" fill="#FFF" d="M0 0h40v40H0z"/>
        <path d="M31.375 6.122a.873.873 0 0 0-.033.022c-3.232 2.305-5.77 1.634-7.422 3.748-1.462 1.871-1.148 4.555.701 6 1.85 1.444 4.529 1.1 5.99-.772 1.651-2.112.396-4.371 1.817-8.044a17.7 17.7 0 0 1 5.325 12.677A17.753 17.753 0 0 1 20 37.507c-9.805 0-17.753-7.949-17.753-17.754C2.247 9.948 10.195 2 20 2c4.328 0 8.294 1.549 11.375 4.122zM19.356 7.895c.245-.588-.435-1.156-.982-.768-2.857 2.038-5.1 1.445-6.56 3.313-1.293 1.655-1.016 4.027.62 5.304 1.634 1.277 4.002.972 5.295-.682 1.467-1.878.336-3.887 1.627-7.167zm16.28 8.816c.194-.467-.346-.918-.78-.61-2.27 1.618-4.05 1.147-5.21 2.631-1.026 1.314-.806 3.197.492 4.211 1.298 1.015 3.18.773 4.205-.541 1.165-1.491.267-3.087 1.293-5.691zM14.34 26.242l1.856-1.856a1.483 1.483 0 0 0 1.628-2.414A1.484 1.484 0 0 0 15.41 23.6l-1.855 1.856-5.298-5.302a.536.536 0 0 0-.758.005A8.52 8.52 0 0 0 5 26.229c0 2.302.888 4.458 2.499 6.069a8.519 8.519 0 0 0 6.07 2.498 8.521 8.521 0 0 0 6.069-2.498.533.533 0 0 0 0-.754l-5.298-5.302z" fill="#A0A7AC"/>
        <path d="M13.273 14.668a2.391 2.391 0 0 1-.411-3.352.341.341 0 1 1 .537.42 1.708 1.708 0 0 0 .294 2.395.341.341 0 1 1-.42.537zM25.572 14.675a2.705 2.705 0 0 1-.466-3.793.386.386 0 1 1 .608.475 1.932 1.932 0 0 0 .333 2.71.386.386 0 1 1-.475.608zM30.805 22.09a1.899 1.899 0 0 1-.327-2.663.27.27 0 1 1 .427.334 1.356 1.356 0 0 0 .234 1.901.27.27 0 1 1-.334.427z" stroke="#979797" fill="#D8D8D8"/>
        <path d="M8.19 23.11l2.6 2.599a.65.65 0 1 0 .919-.92l-2.6-2.599a.65.65 0 1 0-.919.92z" fill="#A0A7AC"/>
        <path d="M8.18 22.115c-.52.433-.907.946-1.155 1.535a5.437 5.437 0 0 0-.403 1.899.5.5 0 0 0 .999.041 4.444 4.444 0 0 1 .326-1.552c.184-.439.474-.822.873-1.153a.5.5 0 0 0-.64-.77z" fill="#A0A7AC"/>
      </g>
    </svg>`,
    label: 'NOAA Weather Radar',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: false,
    id: 'emulated-lightning-density',
    active: false,
    opacity: 1,
    icon: `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <path fill-opacity=".01" fill="#FFF" d="M0 0h40v40H0z"/>
        <path d="M37.753 19.753C37.753 9.948 29.805 2 20 2S2.247 9.948 2.247 19.753 10.195 37.507 20 37.507a17.753 17.753 0 0 0 17.753-17.754" fill="#FFF"/>
        <path d="M19.392 37.497a17.753 17.753 0 0 0 18.361-17.743C37.753 9.947 29.805 2 20 2S2.247 9.948 2.247 19.753c0 8.79 6.387 16.088 14.773 17.505a1.394 1.394 0 0 1-.109-.951l2.702-11.41H12.65c-.85 0-1.508-.75-1.395-1.594L13.13 9.222c.093-.7.69-1.222 1.395-1.222h7.98c.924 0 1.598.877 1.36 1.77l-2.03 7.617h6.77a1.409 1.409 0 0 1 1.218 2.114L19.5 37.337c-.033.056-.069.11-.108.16z" fill="#A0A7AC" fill-rule="nonzero"/>
      </g>
    </svg>`,
    label: 'Lightning Density',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: false,
    id: 'wind-conditions',
    active: false,
    opacity: 0.75,
    icon: `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <path fill-opacity=".01" fill="#FFF" d="M0 0h40v40H0z"/>
        <path d="M38 20c0-9.941-8.059-18-18-18S2 10.059 2 20s8.059 18 18 18a18 18 0 0 0 18-18" fill="#FFF"/>
        <path d="M3.366 13.534C5.886 6.797 12.383 2 20 2c9.805 0 17.753 7.948 17.753 17.753A17.753 17.753 0 0 1 20 37.507c-8.642 0-15.842-6.175-17.428-14.353h8.554c.958 0 1.85.652 2.006 1.598a1.927 1.927 0 0 1-1.898 2.25 1.928 1.928 0 0 1-1.826-1.317c-.126-.38-.517-.607-.917-.607H6.522c-.589 0-1.066.53-.953 1.108a5.782 5.782 0 0 0 5.665 4.664 5.779 5.779 0 0 0 5.724-6.531c-.374-2.91-2.991-5.013-5.924-5.013H2.576a.96.96 0 0 0-.325.057c.014-.676.067-1.341.155-1.996.055.01.112.015.17.015h20.202a5.783 5.783 0 0 0 5.642-7.016c-.458-2.178-2.22-3.94-4.398-4.397a5.784 5.784 0 0 0-6.91 4.541c-.112.575.366 1.1.952 1.1h1.973c.4 0 .79-.228.916-.607a1.926 1.926 0 0 1 1.825-1.317 1.926 1.926 0 0 1 1.897 2.25c-.156.945-1.047 1.598-2.006 1.598H3.366zm22.238 5.772h-9.399a7.563 7.563 0 0 1 2.392 3.848h7.007a2.889 2.889 0 0 1 2.886 2.886 2.889 2.889 0 0 1-2.886 2.886 2.87 2.87 0 0 1-2.499-1.466c-.171-.302-.522-.458-.87-.458h-2.033c-.656 0-1.14.65-.923 1.269 1.068 3.042 4.241 5.095 7.78 4.35 2.479-.523 4.516-2.505 5.091-4.971 1.028-4.408-2.308-8.344-6.546-8.344z" fill="#A0A7AC" fill-rule="nonzero"/>
      </g>
    </svg>`,
    label: 'Wind Speed & Direction',
    loadState: '',
    navigation: true,
  },
  {
    isGroupControl: false,
    id: 'here-live-traffic',
    active: true,
    opacity: 1,
    icon: `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <path fill-opacity=".01" fill="#FFF" d="M0 0h40v40H0z"/>
        <circle fill="#AC997C" cx="20" cy="20" r="18"/>
        <path d="M26.58 22.574h-4.428a1.48 1.48 0 0 1-1.475-1.476 1.48 1.48 0 0 1 1.475-1.475h4.427s4.427-4.935 4.427-7.378a4.428 4.428 0 0 0-8.854 0c0 1.175 1.024 2.923 2.09 4.426h-2.09a4.434 4.434 0 0 0-4.427 4.427 4.434 4.434 0 0 0 4.427 4.427h4.427a1.48 1.48 0 0 1 1.476 1.476 1.48 1.48 0 0 1-1.476 1.475H15.95a31.836 31.836 0 0 1-2.181 2.951h12.81a4.434 4.434 0 0 0 4.427-4.426 4.434 4.434 0 0 0-4.427-4.427zm0-11.805c.815 0 1.475.66 1.475 1.476s-.66 1.475-1.476 1.475-1.475-.66-1.475-1.475c0-.817.659-1.476 1.475-1.476zm-14.757 8.854a4.428 4.428 0 0 0-4.427 4.426c0 2.444 4.427 7.378 4.427 7.378s4.427-4.934 4.427-7.378a4.428 4.428 0 0 0-4.427-4.426zm0 5.902c-.816 0-1.476-.66-1.476-1.476s.66-1.475 1.476-1.475 1.476.66 1.476 1.475c0 .817-.66 1.476-1.476 1.476z" fill="#FFF" fill-rule="nonzero"/>
      </g>
    </svg>`,
    label: 'HERE Live Traffic',
    loadState: '',
    navigation: true,
  },
];

export const layerDefinitions = [
  {
    siteTags: ['bcfiremap', 'adventureconditions', 'crisisconditions'],
    id: 'bc-evacuation-orders',
    type: 'geojson',
    endpoint: 'https://maps.gov.bc.ca/arcgis/rest/services/mpcm/bcgw/MapServer/dynamicLayer/query?layer=%7B%22drawingInfo%22%3A%20null%2C%20%22definitionExpression%22%3A%20null%2C%20%22maxScale%22%3A%200%2C%20%22source%22%3A%20%7B%22type%22%3A%20%22dataLayer%22%2C%20%22dataSource%22%3A%20%7B%22type%22%3A%20%22table%22%2C%20%22workspaceId%22%3A%20%22MPCM_ALL_PUB%22%2C%20%22dataSourceName%22%3A%20%22WHSE_HUMAN_CULTURAL_ECONOMIC.EMRG_ORDER_AND_ALERT_AREAS_SP%22%2C%20%22gdbVersion%22%3A%20%22%22%7D%7D%2C%20%22minScale%22%3A%2037500000%2C%20%22id%22%3A%20null%7D&f=geojson&where=(EVENT_TYPE%20%3D%20%27Fire%27)%20AND%20(ORDER_ALERT_STATUS%20%3D%20%27Order%27)&returnGeometry=true&spatialRel=esriSpatialRelIntersects&maxAllowableOffset=2445&outFields=*&orderByFields=START_ORDER_DATE%20desc&outSR=102100&resultOffset=0',
    oStroke: {
      color: [122, 1, 119, 1],
      width: 2,
    },
    oFill: {
      color: [122, 1, 119, 0.7],
    },
    visible: true,
    opacity: 1,
    label: 'EVENT_NAME',
    labelPrefix: 'EVACUATION Order: \n',
    popup: {
      title: 'Evacuation Order',
      fields: {
        'Event Name': 'EVENT_NAME',
        'Event Number': 'EVENT_NUMBER',
        'Event Type': 'EVENT_TYPE',
        'Start Date': 'ALERT_START_DATE',
        'Status': 'ORDER_ALERT_STATUS',
        'Issuer': 'ISSUING_AGENCY',
        'Regional District': 'REGIONAL_DISTRICT',
        'Municipality': 'MUNICIPALITY',
        'First Nation': 'INDIAN_BAND_NAME',
      },
    },
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions', 'crisisconditions'],
    id: 'bc-evacuation-alerts',
    type: 'geojson',
    endpoint: 'https://maps.gov.bc.ca/arcgis/rest/services/mpcm/bcgw/MapServer/dynamicLayer/query?layer=%7B%22drawingInfo%22%3A%20null%2C%20%22definitionExpression%22%3A%20null%2C%20%22maxScale%22%3A%200%2C%20%22source%22%3A%20%7B%22type%22%3A%20%22dataLayer%22%2C%20%22dataSource%22%3A%20%7B%22type%22%3A%20%22table%22%2C%20%22workspaceId%22%3A%20%22MPCM_ALL_PUB%22%2C%20%22dataSourceName%22%3A%20%22WHSE_HUMAN_CULTURAL_ECONOMIC.EMRG_ORDER_AND_ALERT_AREAS_SP%22%2C%20%22gdbVersion%22%3A%20%22%22%7D%7D%2C%20%22minScale%22%3A%2037500000%2C%20%22id%22%3A%20null%7D&f=geojson&where=(EVENT_TYPE%20%3D%20%27Fire%27)%20AND%20(ORDER_ALERT_STATUS%20%3D%20%27Alert%27)&returnGeometry=true&spatialRel=esriSpatialRelIntersects&maxAllowableOffset=2445&outFields=*&orderByFields=START_ALERT_DATE%20desc&outSR=102100&resultOffset=0&resultRecordCount=50',
    oStroke: {
      color: [226, 0, 147, 1],
      width: 2,
    },
    oFill: {
      color: [226, 0, 147, 0.7],
    },
    visible: true,
    opacity: 1,
    label: 'EVENT_NAME',
    labelPrefix: 'EVACUATION ALERT: \n',
    popup: {
      title: 'Evacuation Alert',
      fields: {
        'Event Name': 'EVENT_NAME',
        'Event Number': 'EVENT_NUMBER',
        'Event Type': 'EVENT_TYPE',
        'Start Date': 'ALERT_START_DATE',
        'Status': 'ORDER_ALERT_STATUS',
        'Issuer': 'ISSUING_AGENCY',
        'Regional District': 'REGIONAL_DISTRICT',
        'Municipality': 'MUNICIPALITY',
        'First Nation': 'INDIAN_BAND_NAME',
      },
    },
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions', 'crisisconditions'],
    id: 'bc-evacuation-all-clear',
    type: 'geojson',
    endpoint: 'https://maps.gov.bc.ca/arcgis/rest/services/mpcm/bcgw/MapServer/dynamicLayer/query?layer=%7B%22drawingInfo%22%3A%20null%2C%20%22definitionExpression%22%3A%20null%2C%20%22maxScale%22%3A%200%2C%20%22source%22%3A%20%7B%22type%22%3A%20%22dataLayer%22%2C%20%22dataSource%22%3A%20%7B%22type%22%3A%20%22table%22%2C%20%22workspaceId%22%3A%20%22MPCM_ALL_PUB%22%2C%20%22dataSourceName%22%3A%20%22WHSE_HUMAN_CULTURAL_ECONOMIC.EMRG_ORDER_AND_ALERT_AREAS_SP%22%2C%20%22gdbVersion%22%3A%20%22%22%7D%7D%2C%20%22minScale%22%3A%2037500000%2C%20%22id%22%3A%20null%7D&f=geojson&where=(EVENT_TYPE%20%3D%20%27Fire%27)%20AND%20(ORDER_ALERT_STATUS%20%3D%20%27All%20Clear%27)&returnGeometry=true&spatialRel=esriSpatialRelIntersects&maxAllowableOffset=2445&outFields=*&orderByFields=START_ALERT_DATE%20desc&outSR=102100&resultOffset=0&resultRecordCount=50',
    oStroke: {
      color: [247, 104, 161, 1],
      width: 2,
    },
    oFill: {
      color: [247, 104, 161, 0.7]
    },
    visible: true,
    opacity: 1,
    label: 'EVENT_NAME',
    labelPrefix: 'ALL-CLEAR: \n',
    popup: {
      title: 'Evacuation All Clear',
      fields: {
        'Event Name': 'EVENT_NAME',
        'Event Number': 'EVENT_NUMBER',
        'Event Type': 'EVENT_TYPE',
        'Start Date': 'ALERT_START_DATE',
        'Status': 'ORDER_ALERT_STATUS',
        'Issuer': 'ISSUING_AGENCY',
        'Regional District': 'REGIONAL_DISTRICT',
        'Municipality': 'MUNICIPALITY',
        'First Nation': 'INDIAN_BAND_NAME',
      },
    },
  },
  // {
  //   siteTags: ['bcfiremap', 'adventureconditions', 'crisisconditions'],
  //   id: 'bc-shelters',
  //   type: 'geojson',
  //   endpoint: essReceptionCentersURL,
  //   // style: 'firepoint',
  //   oImageOptions: {
  //     anchor: [0.5, 17],
  //     anchorXUnits: 'fraction',
  //     anchorYUnits: 'pixels',
  //     src: shelterPointURL,
  //   },
  //   visible: false,
  //   opacity: 1,
  //   label: 'Title',
  //   popup: {
  //     title: 'ESS Reception Center',
  //     note: 'Emergency Social Services Receptions Centers provide support for evacuees, ' + 
  //           'view more details on <a href="https://www.emergencyinfobc.gov.bc.ca/home/information-for-affected-residents-and-evacuees/what-are-emergency-social-services/" target="_blank">' + 
  //           'EmergencyInfoBC</a>',
  //     map: 'map',
  //     fields: {
  //       'Title': 'Title',
  //       'Address': 'Address',
  //       'Phone': 'Phone',
  //     },
  //   },
  // },
  {
    siteTags: ['bcfiremap', 'adventureconditions', 'crisisconditions'],
    id: 'drive-bc-traffic-conditions',
    type: 'geojson',
    dataProjection: 'EPSG:4326',
    endpoint: 'https://plume-api.now.sh/drive511proxy',
    visible: true,
    opacity: 1,
    labelPrefix: 'DriveBC: \n',
    label: 'title',
    popup: {
      title: 'DriveBC Incident',
      fields: {
        'Title': 'title',
        'Headline': 'headline',
        'Severity': 'severity',
        'Status': 'status',
        'Description': 'description',
      },
    },
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions'],
    id: 'cdn-current-weather',
    type: 'imagewms',
    endpoint: 'http://geo.weather.gc.ca/geomet?VERSION=1.3.0',
    params: {
      'SERVICE': 'WMS',
      'VERSION': '1.3.0',
      'LAYERS': 'CURRENT_CONDITIONS',
      'FORMAT': 'image/png',
      'TRANSPARENT': 'TRUE',
      'CRS': 'EPSG:3857',
    },
    ratio: 1,
    visible: false,
    opacity: 1,
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions', 'crisisconditions'],
    id: 'bc-active-fire-perimeters',
    type: 'geojson',
    endpoint: 'https://plume-api.now.sh/simplifygeojson/https://services6.arcgis.com/ubm4tcTYICKBpist/arcgis/rest/services/BCWS_FirePerimeters_PublicView/FeatureServer/0/query?where=FIRE_STATUS+%3C%3E+%27Not+Active%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=geojson&tolerance=250',
    oStroke: {
      color: [255, 0, 0, 1],
      width: 2,
    },
    oFill: {
      color: [255, 165, 0, 0.7],
    },
    visible: true,
    opacity: 1,
    labelPrefix: 'Fire Perimeter: \n',
    label: 'FIRE_OF_NOTE_NAME',
    popup: {
      title: 'Active Fire Perimeter',
      fields: {
        'Fire of Note Name': 'FIRE_OF_NOTE_NAME',
        'Geographic Discription': 'GEOGRAPHIC_DESCRIPTION',
        'Fire Status': 'FIRE_STATUS',
        'Fire Number': 'FIRE_NUMBER',
        'Current Size': 'CURRENT_SIZE',
        'Fire Size (Hectares)': 'FIRE_SIZE_HECTARES',
        'Track Date': 'TRACK_DATE',
        'Load Date': 'LOAD_DATE',
      },
    },
  },
  {
    siteTags: ['adventureconditions', 'crisisconditions'],
    id: 'us-active-fire-perimeters',
    type: 'geojson',
    endpoint: 'https://plume-api.now.sh/simplifygeojson/https://rmgsc-haws2.cr.usgs.gov/arcgis/rest/services/geomac_fires/MapServer/2/query?where=active+%3D+%27Y%27&text=&objectIds=&time=&geometry=-18631848.101007503%252C725135.0462942608%252C-5345258.096368558%252C11888610.153284714&geometryType=esriGeometryEnvelope&inSR=102100&spatialRel=esriSpatialRelContains&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=102100&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson&tolerance=50',
    oStroke: {
      color: [255, 0, 0, 1],
      width: 2,
    },
    oFill: {
      color: [255, 165, 0, 0.7],
    },
    visible: true,
    opacity: 1,
    label: 'incidentname',
    popup: {
      title: 'Active Fire Perimeter',
      fields: {
        'Incident Name': 'incidentname',
        'Fire ID': 'uniquefireidentifier',
        'Complex Name': 'complexname',
        'Mapping Method': 'mapmethod',
        'Acres Size': 'gisacres',
        'State': 'state',
      },
    },
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions', 'crisisconditions'],
    id: 'bc-active-fire-points',
    type: 'geojson',
    endpoint: 'https://services6.arcgis.com/ubm4tcTYICKBpist/arcgis/rest/services/BCWS_ActiveFires_PublicView/FeatureServer/0/query?where=FIRE_STATUS+%3C%3E+%27Not+Active%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelEnvelopeIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=',
    // style: 'firepoint',
    oImageOptions: {
      anchor: [0.5, 17],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: firePointURL,
    },
    visible: true,
    opacity: 1,
    label: 'GEOGRAPHIC_DESCRIPTION',
    popup: {
      title: 'Active Fire Point',
      fields: {
        'Fire Name': 'FIRE_OF_NOTE_NAME',
        'Geographic Discription': 'GEOGRAPHIC_DESCRIPTION',
        'Fire Status': 'FIRE_STATUS',
        'Fire Cause': 'FIRE_CAUSE',
        'Ignition Date': 'IGNITION_DATE',
        'Fire Identifier': 'FIRE_NUMBER',
        'Current Size (hectares)': 'CURRENT_SIZE',
      },
    },
  },
  {
    siteTags: ['adventureconditions', 'crisisconditions'],
    id: 'ab-active-fire-points',
    type: 'esrijson',
    endpoint: 'https://maps.alberta.ca/genesis/rest/services/Wildfire_Status_Web_Map/Latest/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=102100&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson',
    // style: 'firepoint',
    oImageOptions: {
      anchor: [0.5, 17],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: firePointURL,
    },
    visible: true,
    opacity: 1,
    label: 'GEOGRAPHIC_DESCRIPTION',
    popup: {
      title: 'Active Fire Point',
      fields: {
        'Fire Identifier': 'FIRE_NUMBER',
        'Geographic Discription': 'GEOGRAPHIC_DESCRIPTION',
        'Fire Status': 'FIRE_STATUS',
        'Fire Cause': 'GENERAL_CAUSE',
        'Ignition Date': 'IGNITION_DATE',
        'Current Size (hectares)': 'AREA_ESTIMATE',
      },
    },
  },
  {
    siteTags: ['adventureconditions', 'crisisconditions'],
    id: 'us-large-fire-points',
    type: 'geojson',
    endpoint: 'https://rmgsc-haws2.cr.usgs.gov/arcgis/rest/services/geomac_fires/MapServer/1/query?where=&text=&objectIds=&time=&geometry=-18631848.101007503%252C725135.0462942608%252C-5345258.096368558%252C11888610.153284714&geometryType=esriGeometryEnvelope&inSR=102100&spatialRel=esriSpatialRelContains&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=102100&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson',
    // style: 'firepoint',
    oImageOptions: {
      anchor: [0.5, 17],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: firePointURL,
    },
    visible: true,
    opacity: 1,
    label: 'GEOGRAPHIC_DESCRIPTION',
    popup: {
      title: 'US Large Fire Point',
      fields: {
        'Fire Name': 'incidentname',
        'Percentage Contained': 'percentcontained',
        'Fire Cause': 'firecause',
        'Fire Identifier': 'uniquefireidentifier',
        'Current Size (acres)': 'acres',
      },
    },
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions', 'crisisconditions'],
    id: 'modis-satellite',
    type: 'geojson',
    endpoint: 'https://wildfire.cr.usgs.gov/arcgis/rest/services/geomac_fires/MapServer/3/query?where=load_stat%3D%27Active+Burning%27++OR+load_stat%3D%27Last+12-24+hrs%27+OR+load_stat%3D%27Last+24-48+hrs%27&text=&objectIds=&time=&geometry=-15464286.158429246%2C5897585.730705328%2C-12589206.644992914%2C8575781.652083585&geometryType=esriGeometryEnvelope&inSR=102100&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=102100&returnIdsOnly=false&returnCountOnly=false&orderByFields=load_stat&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson',
    style: 'modis',
    visible: false,
    opacity: 1,
    popup: {
      title: 'MODIS NASA/NOAA Satellite Hotspot Detection',
      note: 'A ~1km hotspot has been detected at this location. Multiple overlapping hotspots are joined, and may indicate the leading edge of a fire.',
      fields: {
        'Status': 'load_stat',
      },
    },
  },
  // source url: https://www.ospo.noaa.gov/Products/land/hms.html
  {
    siteTags: ['bcfiremap', 'adventureconditions'],
    id: 'ospo-noaa-smoke',
    type: 'geojson',
    dataProjection: 'EPSG:4326',
    endpoint: 'https://plume-api.now.sh/kmltogeojson/https://www.ospo.noaa.gov/data/land/fire/smoke.kml',
    visible: false,
    style: 'ospoNoaaSmoke',
    opacity: 1,
    popup: {
      title: 'OSPO NOAA Smoke',
      note: 'Created and updated by a satellite analyst between 8am and 10am Eastern Time. After 10am, the analysis is fine-tuned as time permits as additional satellite data becomes available.',
      fields: {
        'Description': 'description',
      },
    },
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions'],
    id: 'nws-experimental-smoke',
    type: 'arcgisrestmapeserver',
    endpoint: 'https://utility.arcgis.com/usrsvcs/servers/668c6a41fd184984a49caee8f759654d/rest/services/LiveFeeds/NDGD_SmokeForecast/MapServer/',
    params: {
      'layers': 'show:0',
      'dpi': 96,
      'transparent': true,
      'format': 'png32',
      'time': `${(Math.floor(moment() / 3600000)) * 3600000},${(Math.floor(moment().add('4','h') / 3600000)) * 3600000}`,
      'imageSR': '102100',
    },
    ratio: 1.5,
    visible: true,
    opacity: 0.5,
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions'],
    id: 'world-air-quality',
    type: 'xyz',
    endpoint: 'https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?' +
              'token=814c13027adaacd8f20999baebc56c07eeda183e',
    visible: false,
    opacity: 1,
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions'],
    id: 'bc-traffic-cameras',
    type: 'geojson',
    endpoint: 'https://services5.arcgis.com/DMpNrZXwcnMmkWrW/arcgis/rest/services/BC_HighwayCams/FeatureServer/0/query?where=&objectIds=&time=&geometry=-14709312.23546%2C+6171605.41945905%2C+-12789524.9063483%2C+8399302.6434706&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=',
    style: 'highwaycams',
    visible: false,
    opacity: 1,
    popup: {
      title: 'BC Highway Camera',
      image: 'links_imageDisplay',
      link: 'links_bchighwaycam',
      fields: {
        'Caption': 'caption',
        'Name': 'camName',
        'Highway': 'highway_number',
        'Description': 'highway_locationDescription',
      },
    },
  },
  {
    siteTags: ['adventureconditions'],
    id: 'idt-cameras',
    type: 'esrijson',
    endpoint: 'https://navigator.state.or.us/arcgis/rest/services/Projects/Prep_TransCams/MapServer/3/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=102100&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&returnTrueCurves=false&resultOffset=&resultRecordCount=&f=json',
    visible: false,
    style: 'highwaycams',
    opacity: 1,
    popup: {
      title: 'Idaho Department of Transport Camera',
      image: 'url',
      fields: {
        'Title': 'device_name',
        'Description': 'name',
        'Route': 'route_designator',
      },
      // html: 'description',
    },
  },
  {
    siteTags: ['adventureconditions'],
    id: 'wsdot-cameras',
    type: 'esrijson',
    endpoint: 'https://navigator.state.or.us/arcgis/rest/services/Projects/Prep_TransCams/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=102100&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&returnTrueCurves=false&resultOffset=&resultRecordCount=&f=json',
    visible: false,
    style: 'highwaycams',
    opacity: 1,
    popup: {
      title: 'Washington Highway Camera',
      image: 'cctv_url',
      fields: {
        'Title': 'Name',
      },
      // html: 'description',
    },
  },
  {
    siteTags: ['adventureconditions'],
    id: 'odot-cameras',
    type: 'esrijson',
    endpoint: 'https://plume-api.now.sh/proxy/https://tripcheck.com/Scripts/map/data/cctvinventory.js?dt=1535581365754',
    visible: false,
    style: 'highwaycams',
    opacity: 1,
    popup: {
      title: 'ODOT Camera',
      image: 'filename',
      fields: {
        'Title': 'title',
        'Route': 'route',
      },
      // html: 'description',
    },
  },
  {
    siteTags: ['adventureconditions'],
    id: 'caltrans-cameras',
    type: 'geojson',
    endpoint: 'https://plume-api.now.sh/kmltogeojson/http://quickmap.dot.ca.gov/data/cctv.kml',
    dataProjection: 'EPSG:4326',
    visible: false,
    style: 'highwaycams',
    opacity: 1,
    popup: {
      title: 'Caltrans Camera',
      html: 'description',
    },
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions'],
    id: 'berkley-earth-air-quality',
    type: 'xyz',
    endpoint: `http://berkeleyearth.lbl.gov/air-quality/maps/hour/${moment().format('YYYYMM')}/${moment().startOf('h').add('6', 'h').format('YYYYMMDDHH')}/tiles/health/{z}/{x}/{y}.png`,
    visible: true,
    opacity: 0.25,
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions'],
    id: 'canadian-fire-danger',
    type: 'imagewms',
    endpoint: 'http://cwfis.cfs.nrcan.gc.ca/geoserver/public/wms?VERSION=1.3.0&SERVICE=WMS',
    params: {
      'LAYERS': `public:fdr${moment().format('YYYYMMDD')}sf`,
      'FORMAT': 'image/png',
      'TRANSPARENT': 'TRUE',
    },
    ratio: 1,
    serverType: 'geoserver',
    visible: false,
    opacity: 0.25,
    navigation: true,
  },
  {
    siteTags: ['adventureconditions'],
    id: 'us-fire-danger',
    type: 'arcgisrestmapeserver',
    endpoint: 'https://firedanger.cr.usgs.gov/arcgis/rest/services/Greenness/USGS_Greenness/MapServer',
    params: {
      LAYERS: 'show:29',
      'dpi': 96,
      'transparent': true,
      'format': 'png8',
      'imageSR': '102100',
    },
    ratio: 1.5,
    visible: false,
    opacity: 0.25,
  },
  {
    siteTags: ['adventureconditions', 'hurricaneconditions'],
    id: 'noaa-radar',
    type: 'arcgisrestmapeserver',
    endpoint: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/radar_base_reflectivity/MapServer/',
    params: {
      'layers': 'show:3',
      'dpi': 96,
      'transparent': true,
      'format': 'png32',
      'imageSR': '102100',
    },
    ratio: 1.5,
    visible: false,
    opacity: 0.75,
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions', 'hurricaneconditions'],
    id: 'wind-conditions',
    type: 'imagewms',
    endpoint: 'http://geo.weather.gc.ca/geomet?VERSION=1.3.0',
    params: {
      'SERVICE': 'WMS',
      'LAYERS': 'GDPS.ETA_UU',
      'FORMAT': 'image/png',
      'TRANSPARENT': 'TRUE',
      'CRS': 'EPSG:3857',
    },
    ratio: 1,
    visible: false,
    opacity: 0.75,
    icon: '<span class="fa-stack fa-lg">' +
          '<i class="fas fa-cloud fa-fw fa-stack-2x 2x"></i>' +
          '<i class="fas fa-arrow-right fa-fw fa-stack-1x" style="color: #ffffff"></i>' +
          '</span>',
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions', 'hurricaneconditions'],
    id: 'emulated-lightning-density',
    type: 'arcgisrestmapeserver',
    endpoint: 'https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/sat_meteo_emulated_imagery_lightningstrikedensity_goes_time/MapServer',
    params: {
      LAYERS: 'show:3',
    },
    ratio: 1.5,
    visible: false,
    opacity: 1,
  },
  {
    siteTags: ['bcfiremap', 'adventureconditions', 'hurricaneconditions'],
    id: 'here-live-traffic',
    type: 'xyz',
    endpoint: 'https://{1-4}.traffic.maps.api.here.com' +
    '/maptile/2.1/flowtile/newest/normal.traffic.day/{z}/{x}/{y}/256/png' +
    '?app_id=GSPhia0Z9VPsKdCPYnHG&app_code=E6tKhHYbjg9MaObtpABhVQ',
    visible: true,
    opacity: 1,
  },
];
