function mySettings(props) {
  return (
    <Page>
         <Select
            label="Theme"
            settingsKey="theme"
            options={[
               {
                 name: "Classic Green",
                 value: {
                   background: "#002200",
                   foreground: "#00ff00"
                 }
               },
               {
                 name: "Classic Red",
                 value: {
                   background: "#220000",
                   foreground: "#ff0000"
                 }
               },
               {
                 name: "Classic Blue",
                 value: {
                   background: "#000022",
                   foreground: "#0000ff"
                 }
               },
               {
                 name: "Classic Yellow",
                 value: {
                   background: "#222200",
                   foreground: "#ffff00"
                 }
               },
               {
                 name: "Classic Pink",
                 value: {
                   background: "#220022",
                   foreground: "#ff00ff"
                 }
               },
               {
                 name: "Classic Cyan",
                 value: {
                   background: "#002222",
                   foreground: "#00ffff"
                 }
               },
               {
                 name: "I love Gold",
                 value: {
                   background: "#221100",
                   foreground: "#FF8C00"
                 }
               },
               {
                 name: "Black and White",
                 value: {
                   background: "#FFFFFF",
                   foreground: "#000000"
                 }
               },
               {
                 name: "White and Black",
                 value: {
                   background: "#000000",
                   foreground: "#FFFFFF"
                 }
               }]
            }
          />
    </Page>
  );
}

registerSettingsPage(mySettings);
