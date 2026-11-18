async function checkIcons8() {
  const url = 'https://icons8.com/api/icons/search?term=instagram&style=3d-fluency-gradient';
  try {
    const res = await fetch('https://img.icons8.com/?size=512&id=Xy10Jcu1L2NT&format=png');
    console.log('Test icons8:', res.status);
  } catch (e) {
    console.error(e);
  }
}
checkIcons8();
