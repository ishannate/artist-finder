/* istanbul ignore file */
export const removeCharacterFromObject = (value?: object, character?: string) => {
  if (value && character) {
    return JSON.parse(
      JSON.stringify(
        value
      ).replace(character, "")
    );
  }
}

export const numberWithCommas = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const secondsToHMS = (value: number | null) => {
  if (value) {
    const duration = Math.floor(value / 1000);
    // Hours, minutes and seconds
    var hrs = Math.floor(duration / 3600);
    var mins = Math.floor((duration % 3600) / 60);
    var secs = Math.floor(duration % 60);

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  } else {
    return "00:00";
  }
}

export const openInNewTab = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};