---
spec_id: admin/sunbritetv-solis-tv
schema_version: ai4av-public-spec-v1
revision: 1
title: "SunBrite Solis Encrypted IP Control Spec"
manufacturer: SunBrite
model_family: SB-FS-49-BL
aliases: []
compatible_with:
  manufacturers:
    - SunBrite
    - SunbriteTV
  models:
    - SB-FS-49-BL
    - SB-FS-55-BL
    - SB-FS-65-BL
    - SB-FS-75-BL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - help.snapone.com
source_urls:
  - "https://help.snapone.com/sb-solis-ig/Content/Topics/IP%20Control%20Guide.htm"
  - "https://help.snapone.com/sb-solis-ig/Content/Topics/Front%20Cover.htm"
  - "https://help.snapone.com/sb-solis-ig/Content/Topics/IP%20Control.htm"
  - "https://help.snapone.com/sb-solis-ig/Content/Topics/RS-232%20Control.htm"
retrieved_at: 2026-09-26T14:23:21.160Z
last_checked_at: 2026-09-26T14:23:21.160Z
generated_at: 2026-09-26T14:23:21.160Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the guide describes a magic packet and destination port/address but does not name the encapsulating transport\""
verification:
  verdict: verified
  checked_at: 2026-09-26T14:23:21.160Z
  matched_actions: 73
  action_count: 73
  confidence: medium
  summary: "All 73 units match exact-model sources; full 43-unit inventory plus aliases covered. Encryption and applicability conflicts explicitly unresolved. (1 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# SunBrite Solis Encrypted IP Control Spec

## Summary

This draft documents the modern encrypted IP control guide linked directly from the SunBrite Solis owner’s manual. The manual explicitly covers all versions of Solis and lists SB-FS-49-BL, SB-FS-55-BL, SB-FS-65-BL and SB-FS-75-BL. It identifies the 2026 version by SW Version 33.xx.xx; earlier versions remain in manual scope. The IP guide labels picture-mode and pause/stop additions as 2023 updates but gives no complete per-command minimum firmware matrix. Control4 OS 3.4.2 is a driver requirement, not TV firmware.

Power-on uses Wake-on-LAN. Other controls use AES-128 encrypted messages over TCP port 9761 with a generated control password. The diagrams, prose and encryption examples contain contradictions; this draft preserves the documented cleartext command inventory and identifies the unresolved framing details before implementation. No hardware behavior is claimed. The 2016 ESC-prefixed RS-232 table previously attached to this family is not evidence for these modern commands.

## Transport
```yaml
protocols:
  - "tcp"
tcp:
  port: 9761
  framing: "AES-ECB encrypted 16-byte IV followed by AES-CBC encrypted command, as drawn in the official framing diagram; see unresolved prose/example conflict."
  framing_status: "UNRESOLVED_SOURCE_CONFLICT"
wol:
  transport: "UNRESOLVED: the guide describes a magic packet and destination port/address but does not name the encapsulating transport"
  port: 4343
  destination: "TV IP or broadcast address for the actual subnet; the guide also allows any port number."
  packet_bytes: 102
auth:
  type: "generated_keycode"
  password: "Eight alphanumeric characters displayed in IP Control settings; generating a new keycode invalidates previous codes."
  key_derivation: "PBKDF2-HMAC-SHA256; first 16 derived bytes are AES key."
  salt_hex: "63 61 B8 0E 9B DC A6 63 8D 07 20 F2 CC 56 8F B9"
  iterations: 16384
encryption:
  algorithm: "AES-128-CBC"
  key_bytes: 16
  iv_bytes: 16
  iv_generation: "Fresh random 16 bytes for each command."
  iv_encryption: "AES-128-ECB per operation text and framing diagram."
  plaintext_terminator_hex: "0D"
  padding: "If plaintext length is not a multiple of 16, append enough bytes to reach that multiple, each containing the number of padding bytes. The guide does not state what to do for already aligned plaintext."
  response: "TV generates a different IV for its response. Decrypt using the TV-side IV and ignore characters after LF (0A); exact response IV extraction/framing is not separately specified."
notes: "All command strings in Actions except power_on are pre-encryption cleartext, never direct plaintext TCP packets. No TLS, HTTP authentication, serial settings or generic LG RS-232 codes are inferred."
```

## Traits
```yaml
- "powerable"
- "routable"
- "levelable"
- "queryable"
```

## Actions
```yaml
- id: "power_on"
  label: "Power On via Wake-on-LAN"
  kind: "action"
  params:
    - name: "mac_hex"
      type: "string"
      description: "Exactly 12 hexadecimal digits representing the selected network interface MAC address; decode each pair into one byte."
  transport: "wol"
  command_hex: "FF FF FF FF FF FF {mac_hex} {mac_hex} {mac_hex} {mac_hex} {mac_hex} {mac_hex} {mac_hex} {mac_hex} {mac_hex} {mac_hex} {mac_hex} {mac_hex} {mac_hex} {mac_hex} {mac_hex} {mac_hex}"
  command_encoding: "hexadecimal byte template, not ASCII"
  notes: "102 bytes: six FF bytes followed by sixteen copies of the six-byte TV MAC. Both devices must be on the same subnet. Use the wired or Wi-Fi MAC for the active interface. Enable Wake-on-LAN and Turn on via Wifi, including when Ethernet is used."
- id: "power_off"
  label: "Power Off"
  kind: "action"
  params: []
  command: "POWER off"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "select_input_tuner"
  label: "Select Input Tuner"
  kind: "action"
  params:
    - name: "input"
      type: "enum"
      values:
        - "dtv"
        - "atv"
        - "cadtv"
        - "catv"
  command: "INPUT_SELECT {input}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Legacy tuner ID retained with an explicit modern tuner selector; the source does not choose one tuner type as a default."
- id: "select_input_hdmi1"
  label: "Select Input Hdmi1"
  kind: "action"
  params: []
  command: "APP_LAUNCH com.webos.app.hdmi1"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "The guide recommends APP_LAUNCH for HDMI selection; INPUT_SELECT also documents this HDMI input."
- id: "select_input_hdmi2"
  label: "Select Input Hdmi2"
  kind: "action"
  params: []
  command: "APP_LAUNCH com.webos.app.hdmi2"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "The guide recommends APP_LAUNCH for HDMI selection; INPUT_SELECT also documents this HDMI input."
- id: "mute"
  label: "Mute"
  kind: "action"
  params: []
  command: "KEY_ACTION volumemute"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Documented remote-key action. No explicit on/off state is implied; use volume_mute for a requested state."
- id: "vol_up"
  label: "Vol Up"
  kind: "action"
  params: []
  command: "KEY_ACTION volumeup"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Exact documented KEY_ACTION spelling; key behavior and availability follow the current TV screen/content."
- id: "vol_down"
  label: "Vol Down"
  kind: "action"
  params: []
  command: "KEY_ACTION volumedown"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Exact documented KEY_ACTION spelling; key behavior and availability follow the current TV screen/content."
- id: "channel_up"
  label: "Channel Up"
  kind: "action"
  params: []
  command: "KEY_ACTION channelup"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Exact documented KEY_ACTION spelling; key behavior and availability follow the current TV screen/content."
- id: "channel_down"
  label: "Channel Down"
  kind: "action"
  params: []
  command: "KEY_ACTION channeldown"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Exact documented KEY_ACTION spelling; key behavior and availability follow the current TV screen/content."
- id: "channel_return"
  label: "Channel Return"
  kind: "action"
  params: []
  command: "KEY_ACTION previouschannel"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Exact documented KEY_ACTION spelling; key behavior and availability follow the current TV screen/content."
- id: "enter"
  label: "Enter"
  kind: "action"
  params: []
  command: "KEY_ACTION ok"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Exact documented KEY_ACTION spelling; key behavior and availability follow the current TV screen/content."
- id: "info"
  label: "Info"
  kind: "action"
  params: []
  command: "KEY_ACTION programminfo"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Exact documented KEY_ACTION spelling; key behavior and availability follow the current TV screen/content."
- id: "closed_caption"
  label: "Closed Caption"
  kind: "action"
  params: []
  command: "KEY_ACTION captionsubtitle"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Exact documented KEY_ACTION spelling; key behavior and availability follow the current TV screen/content."
- id: "sleep"
  label: "Sleep"
  kind: "action"
  params: []
  command: "KEY_ACTION sleepreserve"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Exact documented KEY_ACTION spelling; key behavior and availability follow the current TV screen/content."
- id: "sound_mode"
  label: "Sound Mode"
  kind: "action"
  params: []
  command: "KEY_ACTION audiomode"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Exact documented KEY_ACTION spelling; key behavior and availability follow the current TV screen/content."
- id: "menu"
  label: "Menu"
  kind: "action"
  params: []
  command: "KEY_ACTION settingmenu"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Exact documented KEY_ACTION spelling; key behavior and availability follow the current TV screen/content."
- id: "nav_up"
  label: "Nav Up"
  kind: "action"
  params: []
  command: "KEY_ACTION arrowup"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Exact documented KEY_ACTION spelling; key behavior and availability follow the current TV screen/content."
- id: "nav_down"
  label: "Nav Down"
  kind: "action"
  params: []
  command: "KEY_ACTION arrowdown"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Exact documented KEY_ACTION spelling; key behavior and availability follow the current TV screen/content."
- id: "nav_left"
  label: "Nav Left"
  kind: "action"
  params: []
  command: "KEY_ACTION arrowleft"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Exact documented KEY_ACTION spelling; key behavior and availability follow the current TV screen/content."
- id: "nav_right"
  label: "Nav Right"
  kind: "action"
  params: []
  command: "KEY_ACTION arrowright"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Exact documented KEY_ACTION spelling; key behavior and availability follow the current TV screen/content."
- id: "num_0"
  label: "Num 0"
  kind: "action"
  params: []
  command: "KEY_ACTION number0"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "num_1"
  label: "Num 1"
  kind: "action"
  params: []
  command: "KEY_ACTION number1"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "num_2"
  label: "Num 2"
  kind: "action"
  params: []
  command: "KEY_ACTION number2"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "num_3"
  label: "Num 3"
  kind: "action"
  params: []
  command: "KEY_ACTION number3"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "num_4"
  label: "Num 4"
  kind: "action"
  params: []
  command: "KEY_ACTION number4"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "num_5"
  label: "Num 5"
  kind: "action"
  params: []
  command: "KEY_ACTION number5"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "num_6"
  label: "Num 6"
  kind: "action"
  params: []
  command: "KEY_ACTION number6"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "num_7"
  label: "Num 7"
  kind: "action"
  params: []
  command: "KEY_ACTION number7"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "num_8"
  label: "Num 8"
  kind: "action"
  params: []
  command: "KEY_ACTION number8"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "num_9"
  label: "Num 9"
  kind: "action"
  params: []
  command: "KEY_ACTION number9"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "aspect"
  label: "Aspect"
  kind: "action"
  params:
    - name: "ratio"
      type: "enum"
      values:
        - "4by3"
        - "16by9"
        - "setbyoriginal"
  command: "ASPECT_RATIO {ratio}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "For video mode and live TV only. ID retained with an explicit ratio; no aspect-cycle command inferred."
- id: "picture_mode"
  label: "Picture Mode"
  kind: "action"
  params:
    - name: "mode"
      type: "enum"
      values:
        - "vivid"
        - "normal"
        - "cinema"
        - "game"
        - "eco"
        - "sports"
  command: "PICTURE_MODE {mode}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "SDR accepts all six listed modes. HDR and Dolby Vision list only vivid, normal, cinema and game. The TV/content source determines SDR/HDR/Dolby Vision; these commands cannot switch between them. Incompatible picture-mode requests are ignored."
- id: "picture_mode_standard"
  label: "Picture Mode Standard"
  kind: "action"
  params: []
  command: "PICTURE_MODE normal"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "The picture-mode table maps the human label Standard to the exact token normal in SDR, HDR and Dolby Vision."
- id: "screen_mute"
  label: "Screen Mute"
  kind: "action"
  params:
    - name: "mode"
      type: "enum"
      values:
        - "screenmuteon"
        - "videomuteon"
        - "allmuteoff"
  command: "SCREEN_MUTE {mode}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "screenmuteon mutes OSD and video; videomuteon mutes video only; allmuteoff turns off all listed screen mute types."
- id: "volume_mute"
  label: "Volume Mute"
  kind: "action"
  params:
    - name: "state"
      type: "enum"
      values:
        - "on"
        - "off"
  command: "VOLUME_MUTE {state}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "volume_control"
  label: "Volume Control"
  kind: "action"
  params:
    - name: "level"
      type: "integer"
      min: 0
      max: 100
  command: "VOLUME_CONTROL {level}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "picture_backlight"
  label: "Picture Backlight"
  kind: "action"
  params:
    - name: "level"
      type: "integer"
      min: 0
      max: 100
  command: "PICTURE_BACKLIGHT {level}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "picture_contrast"
  label: "Picture Contrast"
  kind: "action"
  params:
    - name: "level"
      type: "integer"
      min: 0
      max: 100
  command: "PICTURE_CONTRAST {level}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "picture_brightness"
  label: "Picture Brightness"
  kind: "action"
  params:
    - name: "level"
      type: "integer"
      min: 0
      max: 100
  command: "PICTURE_BRIGHTNESS {level}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "picture_colour"
  label: "Picture Colour"
  kind: "action"
  params:
    - name: "level"
      type: "integer"
      min: 0
      max: 100
  command: "PICTURE_COLOUR {level}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Preserve British spelling COLOUR."
- id: "picture_tint"
  label: "Picture Tint"
  kind: "action"
  params:
    - name: "level"
      type: "integer"
      min: 0
      max: 100
  command: "PICTURE_TINT {level}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "0 maximum red; 50 no tint; 100 maximum green."
- id: "picture_sharpness"
  label: "Picture Sharpness"
  kind: "action"
  params:
    - name: "level"
      type: "integer"
      min: 0
      max: 50
  command: "PICTURE_SHARPNESS {level}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "picture_colour_temperature"
  label: "Picture Colour Temperature"
  kind: "action"
  params:
    - name: "level"
      type: "integer"
      min: 0
      max: 100
  command: "PICTURE_COLOUR_TEMPERATURE {level}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "0 maximum warm; 50 neutral; 100 maximum cold."
- id: "audio_balance"
  label: "Audio Balance"
  kind: "action"
  params:
    - name: "level"
      type: "integer"
      min: 0
      max: 100
  command: "AUDIO_BALANCE {level}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "0 maximum left; 50 balanced; 100 maximum right."
- id: "remote_control_lock"
  label: "Remote Control Lock"
  kind: "action"
  params:
    - name: "state"
      type: "enum"
      values:
        - "on"
        - "off"
  command: "REMOTECONTROLLER_LOCK {state}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Command table spells REMOTECONTROLLER_LOCK, while the introductory example spells REMOTECONTROL_LOCK. The table token is transcribed without claiming the conflict is resolved."
  command_status: "UNRESOLVED"
- id: "audio_equalizer"
  label: "Audio Equalizer"
  kind: "action"
  params:
    - name: "band"
      type: "integer"
      min: 1
      max: 5
      description: "1=100 Hz; 2=300 Hz; 3=1 kHz; 4=3 kHz; 5=10 kHz."
    - name: "level"
      type: "integer"
      min: 0
      max: 20
      description: "0 means -10; 10 means 0; 20 means +10."
  command: "AUDIO_EQUALIZER {band} {level}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Sound > Sound Mode Settings > Equalizer must be ON. Example AUDIO_EQUALIZER 3 13 tunes 1 kHz to 3."
- id: "energy_saving"
  label: "Energy Saving"
  kind: "action"
  params:
    - name: "mode"
      type: "enum"
      values:
        - "Auto"
        - "screenoff"
        - "maximum"
        - "medium"
        - "minimum"
        - "off"
  command: "ENERGY_SAVING {mode}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Auto uses capital A. The source warns screenoff may not work on some newer TV models; no model/firmware map is supplied."
- id: "tune_analog"
  label: "Tune Analog"
  kind: "action"
  params:
    - name: "channel"
      type: "integer"
      description: "Decimal channel number; valid range is not specified."
    - name: "source"
      type: "enum"
      values:
        - "antenna"
        - "cable"
  command: "CHANNEL_SETTING_ATSC_ATV {channel} {source}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "tune_digital_cable_major"
  label: "Tune Digital Cable Major"
  kind: "action"
  params:
    - name: "channel"
      type: "integer"
      description: "Decimal channel number; valid range is not specified."
  command: "CHANNEL_SETTING_ATSC_DTV {channel} cablemaj"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "tune_digital_major_minor"
  label: "Tune Digital Major Minor"
  kind: "action"
  params:
    - name: "major"
      type: "integer"
      description: "Major channel number; valid range is not specified."
    - name: "minor"
      type: "integer"
      description: "Minor channel number; source calls this min. channel number; valid range is not specified."
    - name: "source"
      type: "enum"
      values:
        - "antennanotphy"
        - "cablenotphy"
  command: "CHANNEL_SETTING_ATSC_DTV {major} {minor} {source}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "channel_add_delete"
  label: "Channel Add Delete"
  kind: "action"
  params:
    - name: "operation"
      type: "enum"
      values:
        - "add"
        - "delete"
  command: "CHANNEL_ADD_DELETE {operation}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "key_action"
  label: "Key Action"
  kind: "action"
  params:
    - name: "key"
      type: "enum"
      values:
        - "Exit"
        - "channelup"
        - "channeldown"
        - "volumeup"
        - "volumedown"
        - "arrowright"
        - "arrowleft"
        - "volumemute"
        - "deviceinput"
        - "sleepreserve"
        - "livetv"
        - "previouschannel"
        - "favoritechannel"
        - "pause"
        - "stop"
        - "returnback"
        - "captionsubtitle"
        - "arrowup"
        - "arrowdown"
        - "myapp"
        - "settingmenu"
        - "ok"
        - "quickmenu"
        - "videomode"
        - "audiomode"
        - "channellist"
        - "bluebutton"
        - "yellowbutton"
        - "greenbutton"
        - "redbutton"
        - "aspectration"
        - "audiodescription"
        - "programmorder"
        - "userguide"
        - "smarthome"
        - "simplelink"
        - "fastforward"
        - "rewind"
        - "programminfo"
        - "programguide"
        - "play"
        - "slowplay"
        - "soccerscreen"
        - "screenbright"
        - "number0"
        - "number1"
        - "number2"
        - "number3"
        - "number4"
        - "number5"
        - "number6"
        - "number7"
        - "number8"
        - "number9"
  command: "KEY_ACTION {key}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Case and unusual source spellings are preserved, including Exit, aspectration, programmorder and programminfo. Individual key availability depends on the TV/content; no generic LG key codes are substituted."
- id: "input_select"
  label: "Input Select"
  kind: "action"
  params:
    - name: "input"
      type: "enum"
      values:
        - "dtv"
        - "atv"
        - "cadtv"
        - "catv"
        - "hdmi1"
        - "hdmi2"
        - "hdmi3"
        - "hdmi4"
  command: "INPUT_SELECT {input}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "APP_LAUNCH is recommended for HDMI selection."
- id: "app_launch"
  label: "App Launch"
  kind: "action"
  params:
    - name: "appid"
      type: "string"
      description: "A webOS application identifier. The source supplies examples, not a complete supported-ID enum; installed-app availability is not guaranteed."
  command: "APP_LAUNCH {appid}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
- id: "launch_webos_app"
  label: "Launch Webos App"
  kind: "action"
  params:
    - name: "app"
      type: "enum"
      values:
        - "Art"
        - "Clock"
        - "Movements"
        - "Moments"
        - "SoundPalette"
        - "LaunchGameCard"
        - "LaunchSportsCard"
  command: "LAUNCH_WEBOS_APP {app}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "This source row is labelled Launch Always Ready / Smart Home Cards but explicitly says Solis and Veranda 4 do not support Always Ready. Listed tokens are preserved as a source inventory, not a claim these functions work on the target model. Applicability must be confirmed; do not use this as standby power-on."
  command_status: "UNRESOLVED"
- id: "manufacturer_query"
  label: "Manufacturer Query"
  kind: "query"
  params: []
  command: "GET_MANUFACTURER"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
  response_example: "Manufacturer: mfg name"
- id: "model_class_id_query"
  label: "Model Class Id Query"
  kind: "query"
  params: []
  command: "MODEL_NAME"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
  response_example: "Model Name: WebOS22"
- id: "firmware_version_query"
  label: "Firmware Version Query"
  kind: "query"
  params: []
  command: "FIRMWARE_VERSION"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
  response_example: "Firmware Version: 02.03.36"
- id: "firmware_available_query"
  label: "Firmware Available Query"
  kind: "query"
  params: []
  command: "IS_FIRMWARE_AVAILABLE"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
  response_example: "Firmware Available: Yes / No"
- id: "power_status_query"
  label: "Power Status Query"
  kind: "query"
  params: []
  command: "POWER_STATUS"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration. The example includes always ready despite the target-model note saying Always Ready is unsupported; standby responsiveness is not specified."
  response_example: "Power Status: active / always ready"
- id: "current_app_query"
  label: "Current App Query"
  kind: "query"
  params: []
  command: "CURRENT_APP"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
  response_example: "APP: com.webos.app.hdmi1 HDCP: 1.4/2.2 Hot plug: connected / disconnected Signal: Yes / No"
- id: "serial_number_query"
  label: "Serial Number Query"
  kind: "query"
  params: []
  command: "GET_SERIAL_NUMBER"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
  response_example: "Serial Number: SKJY107"
- id: "audio_codec_query"
  label: "Audio Codec Query"
  kind: "query"
  params: []
  command: "GET_CURRENT_AUDIO codec"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
  response_example: "Audio codec: PCM/AC3"
- id: "video_signal_query"
  label: "Video Signal Query"
  kind: "query"
  params: []
  command: "GET_CURRENT_VIDEO signal"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
  response_example: "Video signal type: 720x480"
- id: "audio_output_query"
  label: "Audio Output Query"
  kind: "query"
  params: []
  command: "GET_CURRENT_AUTIO output"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration. GET_CURRENT_AUTIO is the literal source spelling; a possible typo is unresolved and is not silently changed to AUDIO."
  response_example: "Sound output: external_arc / tv_speakers"
  command_status: "UNRESOLVED"
- id: "friendly_name_query"
  label: "Friendly Name Query"
  kind: "query"
  params: []
  command: "FRIENDLY_NAME"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
  response_example: "Friendly name: [mfg] webOS TV WEBOS22"
- id: "arc_status_query"
  label: "Arc Status Query"
  kind: "query"
  params: []
  command: "ARC_STATUS"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
  response_example: "Arc State: not_ready / eARC / ARC"
- id: "lamp_hours_query"
  label: "Lamp Hours Query"
  kind: "query"
  params: []
  command: "LAMP_HOURS"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
  response_example: "Lamp hour: 29/30/35…"
- id: "mac_address_query"
  label: "Mac Address Query"
  kind: "query"
  params:
    - name: "interface"
      type: "enum"
      values:
        - "wired"
        - "wifi"
  command: "GET_MACADDRESS {interface}"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Reply format and complete value domain are not given in the status table."
- id: "mute_state_query"
  label: "Mute State Query"
  kind: "query"
  params: []
  command: "MUTE_STATE"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Reply format and complete value domain are not given in the status table."
- id: "current_volume_query"
  label: "Current Volume Query"
  kind: "query"
  params: []
  command: "CURRENT_VOL"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Reply format and complete value domain are not given in the status table."
- id: "ip_control_state_query"
  label: "Ip Control State Query"
  kind: "query"
  params: []
  command: "GET_IPCONTROL_STATE"
  command_encoding: "cleartext before CR termination, padding and required AES encryption"
  notes: "Returns ON if the server is healthy; otherwise the command times out. No timeout duration is stated."
```

## Feedbacks
```yaml
- id: "manufacturer"
  type: "string"
  query_action: "manufacturer_query"
  response_example: "Manufacturer: mfg name"
  description: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
- id: "model_class_id"
  type: "string"
  query_action: "model_class_id_query"
  response_example: "Model Name: WebOS22"
  description: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
- id: "firmware_version"
  type: "string"
  query_action: "firmware_version_query"
  response_example: "Firmware Version: 02.03.36"
  description: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
- id: "firmware_available"
  type: "string"
  query_action: "firmware_available_query"
  response_example: "Firmware Available: Yes / No"
  description: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
- id: "power_status"
  type: "string"
  query_action: "power_status_query"
  response_example: "Power Status: active / always ready"
  description: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration. The example includes always ready despite the target-model note saying Always Ready is unsupported; standby responsiveness is not specified."
- id: "input_status"
  type: "string"
  query_action: "current_app_query"
  response_example: "APP: com.webos.app.hdmi1 HDCP: 1.4/2.2 Hot plug: connected / disconnected Signal: Yes / No"
  description: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration. CURRENT_APP includes app ID and HDMI status; the old ID is retained for input/app observation, without legacy bracketed serial acknowledgements."
- id: "serial_number"
  type: "string"
  query_action: "serial_number_query"
  response_example: "Serial Number: SKJY107"
  description: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
- id: "audio_codec"
  type: "string"
  query_action: "audio_codec_query"
  response_example: "Audio codec: PCM/AC3"
  description: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
- id: "video_signal"
  type: "string"
  query_action: "video_signal_query"
  response_example: "Video signal type: 720x480"
  description: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
- id: "audio_output"
  type: "string"
  query_action: "audio_output_query"
  response_example: "Sound output: external_arc / tv_speakers"
  description: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration. GET_CURRENT_AUTIO is the literal source spelling; a possible typo is unresolved and is not silently changed to AUDIO."
- id: "friendly_name"
  type: "string"
  query_action: "friendly_name_query"
  response_example: "Friendly name: [mfg] webOS TV WEBOS22"
  description: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
- id: "arc_status"
  type: "string"
  query_action: "arc_status_query"
  response_example: "Arc State: not_ready / eARC / ARC"
  description: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
- id: "lamp_hours"
  type: "string"
  query_action: "lamp_hours_query"
  response_example: "Lamp hour: 29/30/35…"
  description: "Reply is an example from the source, not an exhaustive value domain or supported firmware/model declaration."
- id: "mac_address"
  type: "string"
  query_action: "mac_address_query"
  description: "Reply format and complete value domain are not given in the status table."
- id: "mute_state"
  type: "string"
  query_action: "mute_state_query"
  description: "Reply format and complete value domain are not given in the status table."
- id: "current_volume"
  type: "string"
  query_action: "current_volume_query"
  description: "Reply format and complete value domain are not given in the status table."
- id: "ip_control_state"
  type: "string"
  query_action: "ip_control_state_query"
  description: "Returns ON if the server is healthy; otherwise the command times out. No timeout duration is stated."
  response_example: "ON"
```

## Variables
```yaml
[]
```

## Events
```yaml
[]
```

## Macros
```yaml
[]
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes

### Setup and discovery

Connect the TV and controller to the same LAN. Enable Turn on via Wifi under Settings > General > Devices > External Devices > TV on with mobile, even for wired Ethernet. For the 2026 version or later, use Settings > Support > IP Control Settings. For earlier versions, use Menu > All Settings > General > Network, highlight Network without pressing OK, then quickly enter 82888 and wait for the IP Control menu. Enable SDDP and Wake-on-LAN. Open Network IP Control, set it On, select Generate Keycode, press OK and retain the password. Generating another keycode invalidates the previous code. Enter it into the Control4 driver Password property when that driver is used; a custom client uses the documented PBKDF2 parameters. Record the interface MAC, TV IP and keycode for manual integration.

The TV must be on to broadcast SDDP; it does not broadcast while asleep. The guide documents SDDP 1.0 startup NOTIFY ALIVE, setup NOTIFY IDENTIFY, shutdown NOTIFY OFFLINE and SEARCH responses, plus SSDP Basic:1, dial:1 and MediaRenderer:1 discovery. Discovery is optional and does not replace command encryption. The setup page says standby-on uses only Wake-on-LAN once IP control is configured. For Wi-Fi wake, use the Wi-Fi MAC and a router supporting WME/WMM; disconnect Ethernet while testing WoWLAN. The source’s numerical broadcast-address example conflicts with its own same-subnet instruction; derive the actual subnet broadcast instead of copying that example.

### Source conflicts and implementation limits

The frame diagram explicitly labels an Encrypted IV (AES ECB) followed by an Encrypted message (AES CBC), and preceding prose gives total length 16 + encrypted-command length. Adjacent prose says “Send only the Encrypted message,” and its displayed byte stream differs from the CBC image and netcat example. The draft follows the diagram as the documented intended layout but marks framing unresolved; it does not assert successful interoperability. The padding example uses one 01 byte after VOLUME_MUTE on plus CR; already block-aligned padding policy is unstated. The response diagram shows 4F 4B 0A (OK plus LF) followed by extra bytes; this is a single VOLUME_MUTE on example, not a universal acknowledgement or error grammar. No complete failure-response, timing, reconnect or unsolicited-event contract is supplied.

The model IP guide repeatedly says Always Ready is unsupported; its POWER_STATUS example nevertheless includes always ready and its LAUNCH_WEBOS_APP row lists Always Ready/card functions. The 2026-only RS-232 page separately instructs enabling Always Ready. This version/applicability conflict remains unresolved, and no standby-on API is inferred. The serial page states RS-232 support begins with the 2026 version and requires a Prolific adapter rather than FTDI; this IP draft does not import serial commands from generic LG documentation. Remote-lock spelling and GET_CURRENT_AUTIO spelling conflicts remain identified at their actions.

### Example application IDs

The following source tables are examples, not a closed supported-app enum or a claim that an app is installed. App IDs and unusual spellings are preserved exactly.

| Application | Source application ID(s) |
| --- | --- |
| Settings | com.palm.app.settings |
| Photo & Video | com.webos.app.photovideo |
| Music | com.webos.app.music |
| Guide | com.webos.service.iepg |
| Browser | com.webos.app.browser |
| HDMI | com.webos.app.hdmi1 com.webos.app.hdmi2 com.webos.app.hdmi3 com.webos.app.hdmi4 |

| Application | Source application ID(s) |
| --- | --- |
| Aha | aha |
| Amazon Alexa | amazon.alexa |
| Amazon Music | com.theadelab.amclient-lg |
| Amazon Prime | amazon |
| AMC+ | com.amcplus1.app |
| Apple Music | com.apple.applemusic |
| Apple TV | com.apple.appletv |
| Apple TV+ | com.apple.appletv.web |
| BritBox by BBC & ITV | com.britbox.webos |
| CBS News | com.app.cbsnews |
| dicovery+ | com.discovery.dplus |
| Disney+ | com.disney.disneyplus-prod |
| DuplexPlay | com.duplexiptv.app |
| Freevee | imdbtv |
| Fubo | com.fubotv.app |
| Funimation | com.funimation.webapp |
| GLWiz | glwiz |
| Haystck Local & World News | com.haystacktv.app |
| HBO Max | com.hbo.hbomax |
| Hulu | hulu |
| IBO Player | iboplayer |
| IPTV Smarters | com.iptvsmarters.app |
| LG Channels | com.webos.app.lgchannels (lgchannels.us) |
| Max | com.wbd.stream |
| Movies Anywhere | com.moviesanywhere.app |
| Netflix | Netflix |
| Newsmax | newsmax |
| OnDemandKorea | com.ondemandkorea.ctv.webos |
| Pandora | pandora.lgerp.app |
| Paramount+ | com.cbs-all-access.webapp.prod |
| Peacock | com.peacock.tv |
| Plex | cdp-30 |
| Pluto TV | com.plutotv.app |
| Pure Flix | com.pureflix.smarttv |
| Redbox | com.twc.csg.redbox |
| Shahid | net.mbc.shahid-lgapp |
| Shop Time | com.lgshop.app |
| Showtime | com.showtime.app.showtime |
| Showtime Anytime | com.showtime.app.showtimeanytime |
| SiriusXM | sir.12465.3738 |
| SlingTV | com.movenetworks.app.sling-tv-sling-production |
| Smart IPTV | siptv |
| Smart STB | smartstb |
| SmartOne IPTV | com.smartone-iptv.app |
| Spotify | spotify-beehive |
| SSIPTV | com.ssiptv.app |
| STARZ | com.starz.app.starz-lgtv |
| TikTok TV | com.tiktok.app.tv |
| Tubi | com.tubitv.ott.tubi |
| TV Cast | de.2kit.castbrowserlg |
| Twitch | tv.twitch.tv.starshot.lg |
| Viki | com.viki.lg |
| Vix | vix |
| VUDU | vudu |
| WebVideo Caster | com.instantbits.cast.webvideo |
| Xfinity Stream | com.comcast.app |
| YouTube | youtube.leanback.v4 |
| YouTube Kids | youtube.leanback.kids.v4 |
| YouTube TV | youtube.leanback.ytv.v1 |
| ZeeS | com.zeeS.app |

### Discontinued legacy IDs

These IDs are intentionally removed because the modern model-specific source does not support their old operation or acknowledgement. Matching action and feedback IDs are retained elsewhere; changed parameter requirements are explicit.

| Section | Prior ID | Reason |
| --- | --- | --- |
| Actions | power_toggle | No modern POWER toggle command is listed. Standby-on uses Wake-on-LAN; POWER off is separately documented. |
| Actions | select_input_av | The modern IP guide does not document this legacy operation or its former byte code. |
| Actions | select_input_hdbaset | The modern IP guide does not document this legacy operation or its former byte code. |
| Actions | select_input_usb | The modern IP guide does not document this legacy operation or its former byte code. |
| Actions | select_input_component1 | The modern IP guide does not document this legacy operation or its former byte code. |
| Actions | select_input_component2 | The modern IP guide does not document this legacy operation or its former byte code. |
| Actions | select_input_vga | The modern IP guide does not document this legacy operation or its former byte code. |
| Actions | source_toggle | KEY_ACTION deviceinput is documented, but the source does not establish that it cycles sources like the legacy source-toggle operation; no silent remapping. |
| Actions | picture_mode_personal | The legacy picture preset is not among the modern SDR/HDR/Dolby Vision PICTURE_MODE tokens; no equivalent is established. |
| Actions | picture_mode_sunday | The legacy picture preset is not among the modern SDR/HDR/Dolby Vision PICTURE_MODE tokens; no equivalent is established. |
| Actions | picture_mode_night | The legacy picture preset is not among the modern SDR/HDR/Dolby Vision PICTURE_MODE tokens; no equivalent is established. |
| Actions | num_dash | The modern IP guide does not document this legacy operation or its former byte code. |
| Feedbacks | command_executed | The modern IP source does not document the former legacy serial acknowledgement/state; removed rather than carrying unsupported framing forward. |

### Sources

- https://help.snapone.com/sb-solis-ig/Content/Topics/Front%20Cover.htm
- https://help.snapone.com/sb-solis-ig/Content/Topics/IP%20Control.htm
- https://help.snapone.com/sb-solis-ig/Content/Topics/IP%20Control%20Guide.htm
- https://help.snapone.com/sb-solis-ig/Content/Topics/RS-232%20Control.htm

Full downloaded HTML, exact text extraction, linked encryption diagrams, URL/byte/SHA-256 records and inventories are preserved alongside this draft. No hardware test was performed.

## Provenance

```yaml
source_domains:
  - help.snapone.com
source_urls:
  - "https://help.snapone.com/sb-solis-ig/Content/Topics/IP%20Control%20Guide.htm"
  - "https://help.snapone.com/sb-solis-ig/Content/Topics/Front%20Cover.htm"
  - "https://help.snapone.com/sb-solis-ig/Content/Topics/IP%20Control.htm"
  - "https://help.snapone.com/sb-solis-ig/Content/Topics/RS-232%20Control.htm"
retrieved_at: 2026-09-26T14:23:21.160Z
last_checked_at: 2026-09-26T14:23:21.160Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-26T14:23:21.160Z
matched_actions: 73
action_count: 73
confidence: medium
summary: "All 73 units match exact-model sources; full 43-unit inventory plus aliases covered. Encryption and applicability conflicts explicitly unresolved. (1 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the guide describes a magic packet and destination port/address but does not name the encapsulating transport\""
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
