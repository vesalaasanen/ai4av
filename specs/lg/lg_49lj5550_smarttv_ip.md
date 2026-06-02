---
spec_id: admin/lg-49lj5550-smarttv
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 49LJ5550 SmartTV Control Spec"
manufacturer: LG
model_family: 49LJ5550
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 49LJ5550
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - manualslib.com
  - proaudioinc.com
  - knowledge.tiffinmotorhomes.com
source_urls:
  - https://www.manualslib.com/manual/2267581/Lg-43lj550m.html
  - https://www.manualslib.com/products/Lg-49lj5550-10832443.html
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://knowledge.tiffinmotorhomes.com/Owner_Hub/Allegro_Bus/Allegro_Bus_Component_Manuals/2027_Allegro_Bus_Component_Manuals/LG_External_Control_Device_Setup
retrieved_at: 2026-04-26T14:23:19.626Z
last_checked_at: 2026-04-26T14:23:19.626Z
generated_at: 2026-04-26T14:23:19.626Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Network IP control section is labelled \"For USA only\" — applicability to other regions is unclear"
  - "Which specific connector type (DE9, phone jack, or USB-to-serial) the 49LJ5550 uses is not stated"
  - "flow control not stated; none inferred from 3-wire config"
  - "no continuous variables with independent get/set semantics beyond the actions/feedbacks above"
  - "no unsolicited notification events documented in source"
  - "no multi-step macro sequences explicitly documented in source"
  - "no explicit safety interlocks or power-on sequencing beyond the above operational notes"
  - "which connector type the 49LJ5550 uses (DE9, phone jack, or USB-to-serial)"
  - "firmware version compatibility ranges not stated"
  - "whether IP control is available outside USA"
verification:
  verdict: verified
  checked_at: 2026-04-26T14:23:19.626Z
  matched_actions: 48
  action_count: 48
  confidence: medium
  summary: "All 48 spec actions matched verbatim with source commands; transport parameters verified in manual. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 49LJ5550 SmartTV Control Spec

## Summary
The LG 49LJ5550 is a Smart TV that supports external control via RS-232C serial and TCP/IP (telnet) connections. This spec covers both the serial command protocol (using ASCII command format `[Command1][Command2][ ][Set ID][ ][Data][Cr]`) and the network IP control protocol (plain-text telnet commands over port 9761). Control includes power, volume, input selection, channel tuning, picture adjustments, and IR key emulation.

<!-- UNRESOLVED: Network IP control section is labelled "For USA only" — applicability to other regions is unclear -->
<!-- UNRESOLVED: Which specific connector type (DE9, phone jack, or USB-to-serial) the 49LJ5550 uses is not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9761
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; none inferred from 3-wire config
auth:
  type: none  # inferred: no auth procedure for serial; IP control uses password-protected setup menu but telnet session itself has no login
```

## Traits
```yaml
- powerable    # inferred: power on/off commands present (ka, POWER)
- queryable    # inferred: sending FF data reads status; query commands return current state
- levelable    # inferred: volume, contrast, brightness, color, tint, sharpness, bass, treble, balance, backlight all have 0–max ranges
- routable     # inferred: input select commands present (xb, INPUT_SELECT)
```

## Actions
```yaml
# ── Serial Protocol Commands ──

- id: power_control
  label: Power Control
  kind: action
  transport: serial
  command: "ka"
  format: "k a [SetID] [Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        "00": "Power Off"
        "01": "Power On"
      description: "Power state to set. Send FF to query current state."
  ack: "a [SetID] [OK|NG][Data]x"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  transport: serial
  command: "kc"
  format: "k c [SetID] [Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        "01": "Normal screen"
        "02": "Wide screen (16:9)"
        "04": "Zoom"
        "05": "Zoom 2"
        "06": "Set by Program"
        "07": "14:9"
        "09": "Just Scan"
        "0B": "Full Wide"
        "10-1F": "Cinema Zoom 1-16"
        "0C": "21:9"
      description: "Screen format. Availability depends on model and input signal."
  ack: "c [SetID] [OK|NG][Data]x"

- id: screen_mute
  label: Screen Mute
  kind: action
  transport: serial
  command: "kd"
  format: "k d [SetID] [Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        "00": "Screen mute off (picture on), video mute off"
        "01": "Screen mute on (picture off)"
        "10": "Video mute on"
      description: "Screen/video mute control"
  ack: "d [SetID] [OK|NG][Data]x"

- id: volume_mute
  label: Volume Mute
  kind: action
  transport: serial
  command: "ke"
  format: "k e [SetID] [Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        "00": "Volume mute on (volume off)"
        "01": "Volume mute off (volume on)"
      description: "Send FF to query current mute state."
  ack: "e [SetID] [OK|NG][Data]x"

- id: volume_control
  label: Volume Control
  kind: action
  transport: serial
  command: "kf"
  format: "k f [SetID] [Data][Cr]"
  params:
    - name: data
      type: integer
      min: 0
      max: 100
      description: "Volume level (hex 00-64)"
  ack: "f [SetID] [OK|NG][Data]x"

- id: contrast
  label: Contrast
  kind: action
  transport: serial
  command: "kg"
  format: "k g [SetID] [Data][Cr]"
  params:
    - name: data
      type: integer
      min: 0
      max: 100
      description: "Contrast level (hex 00-64)"
  ack: "g [SetID] [OK|NG][Data]x"

- id: brightness
  label: Brightness
  kind: action
  transport: serial
  command: "kh"
  format: "k h [SetID] [Data][Cr]"
  params:
    - name: data
      type: integer
      min: 0
      max: 100
      description: "Brightness level (hex 00-64)"
  ack: "h [SetID] [OK|NG][Data]x"

- id: color
  label: Color
  kind: action
  transport: serial
  command: "ki"
  format: "k i [SetID] [Data][Cr]"
  params:
    - name: data
      type: integer
      min: 0
      max: 100
      description: "Color level (hex 00-64)"
  ack: "i [SetID] [OK|NG][Data]x"

- id: tint
  label: Tint
  kind: action
  transport: serial
  command: "kj"
  format: "k j [SetID] [Data][Cr]"
  params:
    - name: data
      type: integer
      min: 0
      max: 100
      description: "Tint level (hex 00=Red to 64=Green)"
  ack: "r [SetID] [OK|NG][Data]x"

- id: sharpness
  label: Sharpness
  kind: action
  transport: serial
  command: "kk"
  format: "k k [SetID] [Data][Cr]"
  params:
    - name: data
      type: integer
      min: 0
      max: 50
      description: "Sharpness level (hex 00-32)"
  ack: "k [SetID] [OK|NG][Data]x"

- id: osd_select
  label: OSD Select
  kind: action
  transport: serial
  command: "kl"
  format: "k l [SetID] [Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        "00": "OSD off"
        "01": "OSD on"
      description: "Toggle on-screen display"
  ack: "l [SetID] [OK|NG][Data]x"

- id: remote_control_lock
  label: Remote Control Lock Mode
  kind: action
  transport: serial
  command: "km"
  format: "k m [SetID] [Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        "00": "Lock off"
        "01": "Lock on"
      description: "Lock front panel and remote control. Released by main power cycle."
  ack: "m [SetID] [OK|NG][Data]x"

- id: treble
  label: Treble
  kind: action
  transport: serial
  command: "kr"
  format: "k r [SetID] [Data][Cr]"
  params:
    - name: data
      type: integer
      min: 0
      max: 100
      description: "Treble level (hex 00-64)"
  ack: "u [SetID] [OK|NG][Data]x"

- id: bass
  label: Bass
  kind: action
  transport: serial
  command: "ks"
  format: "k s [SetID] [Data][Cr]"
  params:
    - name: data
      type: integer
      min: 0
      max: 100
      description: "Bass level (hex 00-64)"
  ack: "s [SetID] [OK|NG][Data]x"

- id: balance
  label: Balance
  kind: action
  transport: serial
  command: "kt"
  format: "k t [SetID] [Data][Cr]"
  params:
    - name: data
      type: integer
      min: 0
      max: 100
      description: "Balance level (hex 00-64)"
  ack: "t [SetID] [OK|NG][Data]x"

- id: color_temperature
  label: Color Temperature
  kind: action
  transport: serial
  command: "xu"
  format: "x u [SetID] [Data][Cr]"
  params:
    - name: data
      type: integer
      min: 0
      max: 100
      description: "Color temperature (hex 00-64)"
  ack: "l [SetID] [OK|NG][Data]x"

- id: energy_saving
  label: Energy Saving
  kind: action
  transport: serial
  command: "jq"
  format: "j q [SetID] [Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        "00": "Off"
        "01": "Minimum"
        "02": "Medium"
        "03": "Maximum"
        "04": "Auto / Intelligent sensor"
        "05": "Screen off"
      description: "Energy saving mode"
  ack: "q [SetID] [OK|NG][Data]x"

- id: tune_channel
  label: Tune Channel
  kind: action
  transport: serial
  command: "ma"
  format: "m a [SetID] [Data00] [Data01] [Data02][Cr]"
  params:
    - name: data00
      type: integer
      description: "Physical/major channel high byte (hex)"
    - name: data01
      type: integer
      description: "Physical/major channel low byte (hex)"
    - name: data02
      type: integer
      description: "Input source type (hex). Varies by region and signal type."
  ack: "a [SetID] [OK][Data00][Data01][Data02]x"
  note: >
    Channel tune format varies significantly by region (Europe/Mid-East/Asia vs North/Latin America vs Japan).
    See source for full Data02 input source codes and extended format for ATSC/ISDB digital tuning (6 data bytes).

- id: channel_add_delete
  label: Channel Add/Delete(Skip)
  kind: action
  transport: serial
  command: "mb"
  format: "m b [SetID] [Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        "00": "Delete (ATSC/ISDB) / Skip (DVB)"
        "01": "Add"
      description: "Set saved channel status"
  ack: "b [SetID] [OK|NG][Data]x"

- id: key_action_serial
  label: Key (IR Remote Emulation)
  kind: action
  transport: serial
  command: "mc"
  format: "m c [SetID] [Data][Cr]"
  params:
    - name: data
      type: integer
      description: "IR key code in hex (see Key Codes table)"
  ack: "c [SetID] [OK|NG][Data]x"

- id: backlight_control
  label: Backlight Control
  kind: action
  transport: serial
  command: "mg"
  format: "m g [SetID] [Data][Cr]"
  params:
    - name: data
      type: integer
      min: 0
      max: 100
      description: "Backlight/panel light level (hex 00-64)"
  ack: "g [SetID] [OK|NG][Data]x"

- id: input_select_serial
  label: Input Select
  kind: action
  transport: serial
  command: "xb"
  format: "x b [SetID] [Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        "00": "DTV"
        "01": "CADTV"
        "02": "Satellite DTV"
        "03": "ISDB-CS1 (Japan)"
        "04": "ISDB-CS2 (Japan)"
        "10": "ATV"
        "11": "CATV"
        "20": "AV or AV1"
        "21": "AV2"
        "40": "Component1"
        "41": "Component2"
        "60": "RGB"
        "90": "HDMI1"
        "91": "HDMI2"
        "92": "HDMI3"
        "93": "HDMI4"
      description: "Input source for main picture"
  ack: "b [SetID] [OK|NG][Data]x"

- id: auto_configure
  label: Auto Configure
  kind: action
  transport: serial
  command: "ju"
  format: "j u [SetID] [Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        "01": "Set Auto Configure"
      description: "Auto-adjust picture position in RGB (PC) mode only"
  ack: "u [SetID] [OK|NG][Data]x"

# ── TCP/IP (Telnet) Protocol Commands ──

- id: power_off_ip
  label: Power Off (IP)
  kind: action
  transport: tcp
  command: "POWER off"
  format: "POWER off"
  params: []
  ack: "OK / NG"

- id: aspect_ratio_ip
  label: Aspect Ratio (IP)
  kind: action
  transport: tcp
  command: "ASPECT_RATIO"
  format: "ASPECT_RATIO [mode]"
  params:
    - name: mode
      type: enum
      values: ["4by3", "16by9", "setbyoriginal"]
      description: "Aspect ratio mode"
  ack: "OK / NG"

- id: screen_mute_ip
  label: Screen Mute (IP)
  kind: action
  transport: tcp
  command: "SCREEN_MUTE"
  format: "SCREEN_MUTE [mode]"
  params:
    - name: mode
      type: enum
      values: ["screenmuteon", "videomuteon", "allmuteoff"]
      description: "Screen/video mute mode"
  ack: "OK / NG"

- id: volume_mute_ip
  label: Volume Mute (IP)
  kind: action
  transport: tcp
  command: "VOLUME_MUTE"
  format: "VOLUME_MUTE [state]"
  params:
    - name: state
      type: enum
      values: ["on", "off"]
      description: "Mute on or off"
  ack: "OK / NG"

- id: volume_control_ip
  label: Volume Control (IP)
  kind: action
  transport: tcp
  command: "VOLUME_CONTROL"
  format: "VOLUME_CONTROL [level]"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Volume level (decimal 0-100)"
  ack: "OK / NG"

- id: contrast_ip
  label: Contrast (IP)
  kind: action
  transport: tcp
  command: "PICTURE_CONTRAST"
  format: "PICTURE_CONTRAST [level]"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Contrast level (decimal 0-100)"
  ack: "OK / NG"

- id: brightness_ip
  label: Brightness (IP)
  kind: action
  transport: tcp
  command: "PICTURE_BRIGHTNESS"
  format: "PICTURE_BRIGHTNESS [level]"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Brightness level (decimal 0-100)"
  ack: "OK / NG"

- id: color_ip
  label: Color (IP)
  kind: action
  transport: tcp
  command: "PICTURE_COLOUR"
  format: "PICTURE_COLOUR [level]"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Color level (decimal 0-100)"
  ack: "OK / NG"

- id: tint_ip
  label: Tint (IP)
  kind: action
  transport: tcp
  command: "PICTURE_TINT"
  format: "PICTURE_TINT [level]"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Tint level (decimal 0-100)"
  ack: "OK / NG"

- id: sharpness_ip
  label: Sharpness (IP)
  kind: action
  transport: tcp
  command: "PICTURE_SHARPNESS"
  format: "PICTURE_SHARPNESS [level]"
  params:
    - name: level
      type: integer
      min: 0
      max: 50
      description: "Sharpness level (decimal 0-50)"
  ack: "OK / NG"

- id: osd_select_ip
  label: OSD Select (IP)
  kind: action
  transport: tcp
  command: "OSD_SELECT"
  format: "OSD_SELECT [state]"
  params:
    - name: state
      type: enum
      values: ["on", "off"]
      description: "OSD on or off"
  ack: "OK / NG"

- id: remote_lock_ip
  label: Remote Control Lock (IP)
  kind: action
  transport: tcp
  command: "REMOTECONTROLER_LOCK"
  format: "REMOTECONTROLER_LOCK [state]"
  params:
    - name: state
      type: enum
      values: ["on", "off"]
      description: "Lock on or off"
  ack: "OK / NG"

- id: balance_ip
  label: Balance (IP)
  kind: action
  transport: tcp
  command: "AUDIO_BALANCE"
  format: "AUDIO_BALANCE [level]"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Balance level (decimal 0-100)"
  ack: "OK / NG"

- id: color_temperature_ip
  label: Color Temperature (IP)
  kind: action
  transport: tcp
  command: "PICTURE_COLOUR_TEMPERATURE"
  format: "PICTURE_COLOUR_TEMPERATURE [level]"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Color temperature (decimal 0-100)"
  ack: "OK / NG"

- id: equalizer_ip
  label: Equalizer (IP)
  kind: action
  transport: tcp
  command: "AUDIO_EQUALIZER"
  format: "AUDIO_EQUALIZER [band] [step]"
  params:
    - name: band
      type: integer
      min: 1
      max: 5
      description: "Frequency band (1-5)"
    - name: step
      type: integer
      min: 0
      max: 20
      description: "EQ step (decimal 0-20). Precondition: sound mode set to Equalizer on."
  ack: "OK / NG"

- id: energy_saving_ip
  label: Energy Saving (IP)
  kind: action
  transport: tcp
  command: "ENERGY_SAVING"
  format: "ENERGY_SAVING [mode]"
  params:
    - name: mode
      type: enum
      values: ["screenoff", "maximum", "medium", "minimum", "off"]
      description: "Energy saving mode"
  ack: "OK / NG"

- id: tune_channel_ip
  label: Tune Channel (IP)
  kind: action
  transport: tcp
  command: "CHANNEL_SETTING_ATSC_*"
  format: "CHANNEL_SETTING_ATSC_ATV [ch] antenna | CHANNEL_SETTING_ATSC_ATV [ch] cable | CHANNEL_SETTING_ATSC_DTV [ch] cablenotphy | CHANNEL_SETTING_ATSC_DTV [maj] [min] antennanotphy | CHANNEL_SETTING_ATSC_DTV [maj] [min] cablenotphy"
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: source
      type: enum
      values: ["antenna", "cable", "cablenotphy", "antennanotphy"]
      description: "Input source type"
  ack: "OK / NG"
  note: "Multiple sub-commands for analog/digital antenna/cable tuning"

- id: channel_add_delete_ip
  label: Channel Add/Delete (IP)
  kind: action
  transport: tcp
  command: "CHANNEL_ADD_DELETE"
  format: "CHANNEL_ADD_DELETE [action]"
  params:
    - name: action
      type: enum
      values: ["add", "delete"]
      description: "Add or delete current channel"
  ack: "OK / NG"

- id: key_action_ip
  label: Key Action (IP)
  kind: action
  transport: tcp
  command: "KEY_ACTION"
  format: "KEY_ACTION [key]"
  params:
    - name: key
      type: enum
      values: ["exit", "channelup", "channeldown", "volumeup", "volumedown", "arrowright", "arrowleft", "volumemute", "deviceinput", "sleepreserve", "livetv", "previouschannel", "favoritechannel", "teletext", "teletextoption", "returnback", "avmode", "captionsubtitle", "arrowup", "arrowdown", "myapp", "settingmenu", "ok", "quickmenu", "videomode", "audiomode", "channellist", "bluebutton", "yellowbutton", "greenbutton", "redbutton", "aspectratio", "audiodescription", "programmorder", "userguide", "smarthome", "simplelink", "fastforward", "rewind", "programminfo", "programguide", "play", "slowplay", "soccerscreen", "record", "3d", "autoconfig", "app", "screenbright", "number0", "number1", "number2", "number3", "number4", "number5", "number6", "number7", "number8", "number9"]
      description: "IR remote key to emulate"
  ack: "OK / NG"

- id: backlight_ip
  label: Backlight (IP)
  kind: action
  transport: tcp
  command: "PICTURE_BACKLIGHT"
  format: "PICTURE_BACKLIGHT [level]"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Backlight level (decimal 0-100). Precondition: Energy Saving off."
  ack: "OK / NG"

- id: input_select_ip
  label: Input Select (IP)
  kind: action
  transport: tcp
  command: "INPUT_SELECT"
  format: "INPUT_SELECT [source]"
  params:
    - name: source
      type: enum
      values: ["dtv", "atv", "cadtv", "catv", "avav1", "component1", "hdmi1", "hdmi2", "hdmi3"]
      description: "Input source"
  ack: "OK / NG"

- id: three_d_ip
  label: 3D Control (IP)
  kind: action
  transport: tcp
  command: "PICTURE_3D"
  format: "PICTURE_3D [mode] [pattern] [direction] [depth]"
  params:
    - name: mode
      type: enum
      values: ["off", "3dto2d", "2dto3d", "on"]
      description: "3D mode"
    - name: pattern
      type: enum
      values: ["topandbottom", "sidebyside", "checkboard", "framesequential", "columninterleaving", "rowinterleaving"]
      description: "3D pattern (only when mode=on)"
    - name: direction
      type: enum
      values: ["righttoleft", "lefttoright"]
      description: "3D direction (only when mode=on or 2dto3d)"
    - name: depth
      type: integer
      min: 0
      max: 20
      description: "3D depth (only when mode=on or 2dto3d)"
  ack: "OK / NG"

- id: three_d_extension_ip
  label: Extended 3D (IP)
  kind: action
  transport: tcp
  command: "PICTURE_3D_EXTENSION"
  format: "PICTURE_3D_EXTENSION [option] [value]"
  params:
    - name: option
      type: enum
      values: ["picturecorrection", "depth", "viewpoint", "colorcorrection", "sound", "normal", "genre"]
      description: "3D option to control"
    - name: value
      type: string
      description: "Value depends on option selected (various ranges)"
  ack: "OK / NG"
- id: ism_method
  label: ISM Method
  kind: action
  transport: serial
  command: "jp"
  format: "j p [SetID] [Data][Cr]"
  params:
    - name: data
      type: enum
      values:
        "02": "Orbiter"
        "08": "Normal"
        "20": "Color(Colour) Wash"
      description: "ISM method to reduce screen burn. Only Plasma TV models."
  ack: "p [SetID] [OK|NG][Data]x"

- id: equalizer_serial
  label: Equalizer (Serial)
  kind: action
  transport: serial
  command: "jv"
  format: "j v [SetID] [Data][Cr]"
  params:
    - name: data
      type: integer
      description: "Bit-encoded byte: bits 7-5 = frequency band (000=1st,001=2nd,010=3rd,011=4th,100=5th), bits 4-0 = step (0-20 decimal)."
  ack: "v [SetID] [OK|NG][Data]x"
```

## Feedbacks
```yaml
# Serial protocol: all commands support query by sending FF as data.
# Acknowledgement format returns current state.
# OK Ack: [Command2][ ][Set ID][ ][OK][Data][x]
# Error Ack: [Command2][ ][Set ID][ ][NG][Data][x]

- id: power_state
  type: enum
  values: ["on", "off"]
  query_format: "k a [SetID] FF[Cr]"
  response_format: "a [SetID] OK[Data]x"
  note: "Data 01=On, 00=Off"

- id: volume_level
  type: integer
  min: 0
  max: 100
  query_format: "k f [SetID] FF[Cr]"
  response_format: "f [SetID] OK[Data]x"

- id: mute_state
  type: enum
  values: ["on", "off"]
  query_format: "k e [SetID] FF[Cr]"
  response_format: "e [SetID] OK[Data]x"

- id: input_source
  type: enum
  values: ["DTV", "CADTV", "ATV", "CATV", "AV/AV1", "AV2", "Component1", "Component2", "RGB", "HDMI1", "HDMI2", "HDMI3", "HDMI4"]
  query_format: "x b [SetID] FF[Cr]"
  response_format: "b [SetID] OK[Data]x"

# IP protocol: each command returns OK or NG as plain text
- id: ip_command_ack
  type: enum
  values: ["OK", "NG"]
  note: "All IP commands return OK on success, NG on failure"
```

## Variables
```yaml
# UNRESOLVED: no continuous variables with independent get/set semantics beyond the actions/feedbacks above
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences explicitly documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "During media playback or recording, all commands except Power (ka/POWER) and Key (mc/KEY_ACTION) are rejected as NG"
  - description: "Remote control lock mode is released when main power is cycled (plug-off, wait 20-30 seconds, plug-in)"
  - description: "With USB-to-Serial converter, power command (ka) only works when TV is on; with RS-232C cable it works in both power-on and power-off states"
# UNRESOLVED: no explicit safety interlocks or power-on sequencing beyond the above operational notes
```

## Notes
- The TV supports two independent control interfaces: RS-232C serial (ASCII protocol with `[Command1][Command2]` format) and TCP/IP telnet (plain-text commands on port 9761).
- Set ID allows controlling individual TVs in a multi-display setup. Range 1-99; Set ID 0 broadcasts to all connected sets.
- Serial communication uses ASCII codes: `[Cr]` = 0x0D, `[Space]` = 0x20.
- Data values in serial protocol are hexadecimal. Data values in IP protocol are decimal.
- IP control requires enabling "Network IP Control" in the TV setup menu (accessed via Settings button hold 5s + 828 + OK). Default setup password is 828.
- The IP control section is labelled "For USA only" in the source document — applicability to other regions is unclear.
- WOL (Wake On LAN) is supported for power-on when "Mobile TV On" is enabled in settings.
- The 3D commands and ISM Method command are model-dependent and may not apply to the 49LJ5550 specifically.
<!-- UNRESOLVED: which connector type the 49LJ5550 uses (DE9, phone jack, or USB-to-serial) -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: whether IP control is available outside USA -->

## Provenance

```yaml
source_domains:
  - manualslib.com
  - proaudioinc.com
  - knowledge.tiffinmotorhomes.com
source_urls:
  - https://www.manualslib.com/manual/2267581/Lg-43lj550m.html
  - https://www.manualslib.com/products/Lg-49lj5550-10832443.html
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://knowledge.tiffinmotorhomes.com/Owner_Hub/Allegro_Bus/Allegro_Bus_Component_Manuals/2027_Allegro_Bus_Component_Manuals/LG_External_Control_Device_Setup
retrieved_at: 2026-04-26T14:23:19.626Z
last_checked_at: 2026-04-26T14:23:19.626Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T14:23:19.626Z
matched_actions: 48
action_count: 48
confidence: medium
summary: "All 48 spec actions matched verbatim with source commands; transport parameters verified in manual. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Network IP control section is labelled \"For USA only\" — applicability to other regions is unclear"
- "Which specific connector type (DE9, phone jack, or USB-to-serial) the 49LJ5550 uses is not stated"
- "flow control not stated; none inferred from 3-wire config"
- "no continuous variables with independent get/set semantics beyond the actions/feedbacks above"
- "no unsolicited notification events documented in source"
- "no multi-step macro sequences explicitly documented in source"
- "no explicit safety interlocks or power-on sequencing beyond the above operational notes"
- "which connector type the 49LJ5550 uses (DE9, phone jack, or USB-to-serial)"
- "firmware version compatibility ranges not stated"
- "whether IP control is available outside USA"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
