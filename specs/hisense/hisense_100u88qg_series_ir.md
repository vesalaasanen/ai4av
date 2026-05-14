---
spec_id: admin/hisense-100u88qg-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 100U88QG Series Control Spec"
manufacturer: HiSense
model_family: "100U88QG Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "100U88QG Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-14T18:17:16.007Z
generated_at: 2026-05-14T18:17:16.007Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:16.007Z
  matched_actions: 39
  action_count: 44
  confidence: high
  summary: "All spec actions matched literally in source; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# HiSense 100U88QG Series Control Spec

## Summary
Prosumer TV supporting both RS-232 serial control and discrete IR control. RS-232 protocol uses ASCII command format over DB9 female connector at 9600 baud, 8N1, no flow control. IR section provides Pronto CCF hex codes for discrete remote functions including power, input selection, and navigation. No login/auth required for either protocol.

<!-- UNRESOLVED: IR port number not applicable; Pronto CCF codes are IR, not network -->
<!-- UNRESOLVED: TCP/IP control not present in this source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: POWR0000/0001 power on/off commands present
- queryable  # inferred: multiple query commands (INPT????, PMOD????, etc.)
- routable   # inferred: INPT input source selection commands present
- levelable  # inferred: BRIT, CONT, COLR, SHRP, VOLM, BKLV level commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: "S[ID]POWR0001 — power on; requires PWRE0001 enable first"
- id: power_off
  label: Power Off
  kind: action
  params: []
  description: "S[ID]POWR0000 — standby"
- id: power_on_command_enable
  label: Enable RS-232 Remote Power On
  kind: action
  params: []
  description: "S[ID]PWRE0001 — enables remote power-on from standby"
- id: input_select
  label: Set Input Source
  kind: action
  params:
    - name: source
      type: integer
      description: "0=TV, 1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4"
  description: "S[ID]INPT#### — set input source"
- id: picture_mode_set
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport"
  description: "S[ID]PMOD####"
- id: brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 100
  description: "S[ID]BRIT#### — 0000-0100"
- id: contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 100
  description: "S[ID]CONT#### — 0000-0100"
- id: color_saturation_set
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 100
  description: "S[ID]COLR#### — 0000-0100"
- id: tint_set
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 100
  description: "S[ID]TINT#### — 0000-0100"
- id: sharpness_set
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 20
  description: "S[ID]SHRP#### — 0000-0020"
- id: aspect_ratio_set
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: "0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema"
  description: "S[ID]ASPT####"
- id: overscan_set
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: integer
      description: "0=On, 2=Off"
  description: "S[ID]OVSN####"
- id: reset_picture_settings
  label: Reset Picture Settings
  kind: action
  params: []
  description: "S[ID]RSTP1000"
- id: color_temp_set
  label: Set Color Temperature
  kind: action
  params:
    - name: temp
      type: integer
      description: "0=High, 2=Middle, 3=Mid-Low, 4=Low"
  description: "S[ID]CTEM####"
- id: backlight_set
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 100
  description: "S[ID]BKLV#### — 0000-0100"
- id: sound_mode_set
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night"
  description: "S[ID]AMOD####"
- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  params: []
  description: "S[ID]RSTA2000"
- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 100
  description: "S[ID]VOLM#### — 0000-0100"
- id: mute_set
  label: Set Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off (unmute), 1=On"
  description: "S[ID]MUTE####"
- id: tv_speaker_set
  label: Set TV Speaker
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 2=On"
  description: "S[ID]ASPK####"
- id: tuner_mode_set
  label: Set Tuner Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Antenna, 2=Cable"
  description: "S[ID]TUNR####"
- id: channel_up
  label: Channel Up
  kind: action
  params: []
  description: "S[ID]CHAN0001"
- id: channel_down
  label: Channel Down
  kind: action
  params: []
  description: "S[ID]CHAN0000"
- id: caption_control_set
  label: Set Caption Control
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off, 2=On, 3=CC on when mute"
  description: "S[ID]CC######"
- id: factory_reset
  label: Restore Factory Settings
  kind: action
  params: []
  description: "S[ID]RSET9999"
- id: osd_language_set
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: integer
      description: "0=English, 2=Español, 3=Français"
  description: "S[ID]LANG####"
- id: standby_led_set
  label: Set Standby LED
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 2=On"
  description: "S[ID]PLED####"
- id: remote_button
  label: Simulate Remote Button
  kind: action
  params:
    - name: button
      type: string
      description: "BTTN command code e.g. 1034=CH+, 1035=CH-, 1032=VOL-, 1033=VOL+, 1045=BACK, 1012=POWER, 1031=MUTE, 1000-1009=digits, etc."
  description: "S[ID]BTTN1### — simulate remote control button press"
- id: volume_control_lock
  label: Set Volume Control Lock
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Locked, 1=Last Volume, 2=AC Reset, 3=Standby Reset"
  description: "S[ID]SVOL####"
- id: volume_locked_level_set
  label: Set Volume Locked Level
  kind: action
  params:
    - name: level
      type: integer
      minimum: 0
      maximum: 100
  description: "S[ID]VLFL#### — 0000-0100"
- id: panel_key_set
  label: Set Panel Key
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Enable, 1=Disable"
  description: "S[ID]PANL####"
- id: menu_access_set
  label: Set Menu Access
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Enable, 1=Disable"
  description: "S[ID]MENU####"
- id: osd_mode_set
  label: Set OSD Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Enable, 1=Disable"
  description: "S[ID]OSD#####"
- id: input_mode_set
  label: Set Input Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Locked, 1=Selectable, 2=AC Reset, 3=Standby Reset"
  description: "S[ID]INPM####"
- id: power_on_input_select
  label: Set Power On Input Select
  kind: action
  params:
    - name: source
      type: integer
      description: "0=Last, 1=Air, 2=AV, 3=Component, and others"
  description: "S[ID]POIS####"
- id: automatic_search
  label: Automatic Channel Search
  kind: action
  params: []
  description: "S[ID]TSCN0001 — trigger automatic channel search"
- id: power_off_control_mode_set
  label: Set Power Off Control Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=AC Only, 1=All"
  description: "S[ID]PBTN#### — set power off control mode; 0=AC ONLY, 1=ALL"
- id: remote_key_set
  label: Set Remote Key
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Enable, 1=Disable, 2=Partial"
  description: "S[ID]RMOT#### — set remote key control; 0=ENABLE, 1=DISABLE, 2=PARTIAL"
- id: tv_speaker_mode_set
  label: Set TV Speaker Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Speaker, 1=Off, 2=ARC First"
  description: "S[ID]SPKM#### — set TV speaker mode; 0=SPEAKER, 1=OFF, 2=ARC FIRST"
- id: b2b_function_mode_set
  label: Set B2B Function Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Enable, 1=Disable"
  description: "S[ID]B2BM#### — set B2B function mode; 0=ENABLE, 1=DISABLE"
- id: usb_behavior_set
  label: Set USB Behavior
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Home, 1=B2B"
  description: "S[ID]USBM#### — set USB behavior; 0=Home, 1=B2B"
- id: pixel_shifting_set
  label: Set Pixel Shifting
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"
  description: "S[ID]PSHF#### — set pixel shifting; 0=Off, 1=On"
- id: max_volume_set
  label: Set Maximum Volume
  kind: action
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 100
  description: "S[ID]MAVL#### — set maximum volume range; 0000-0100"
- id: av_setting_menu_set
  label: Set AV Setting Menu
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Disable, 1=Enable"
  description: "S[ID]AVMN#### — set AV setting menu access; 0=DISABLE, 1=ENABLE"
```

## Feedbacks
```yaml
- id: ack
  label: Acknowledgement
  type: enum
  values:
    - OKAY
    - EROR
    - WAIT
  description: "TV acknowledgement after every command: colon [CLIENT ID] : OKAY/EROR/WAIT #### [CHECKSUM] Cr"
- id: power_state
  label: Power State
  type: enum
  values:
    - "0"
    - "1"
  description: "Query POWR???? returns 0=standby, 1=power on"
- id: input_source
  label: Current Input Source
  type: enum
  values:
    - "0"
    - "1"
    - "3"
    - "4"
    - "6"
    - "9"
    - "10"
    - "11"
    - "12"
  description: "Query INPT???? — 0/1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4"
- id: picture_mode
  label: Current Picture Mode
  type: enum
  values:
    - "0"
    - "2"
    - "3"
    - "4"
    - "5"
    - "6"
  description: "Query PMOD???? — 0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport"
- id: brightness
  label: Brightness Value
  type: integer
  description: "Query BRIT???? — range 0-100"
- id: contrast
  label: Contrast Value
  type: integer
  description: "Query CONT???? — range 0-100"
- id: color_saturation
  label: Color Saturation Value
  type: integer
  description: "Query COLR???? — range 0-100"
- id: tint
  label: Tint Value
  type: integer
  description: "Query TINT???? — range 0-100"
- id: sharpness
  label: Sharpness Value
  type: integer
  description: "Query SHRP???? — range 0-20"
- id: aspect_ratio
  label: Current Aspect Ratio
  type: enum
  values:
    - "0"
    - "2"
    - "3"
    - "4"
    - "5"
    - "6"
    - "7"
    - "8"
  description: "Query ASPT???? — 0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1, 7=Panoramic, 8=Cinema"
- id: mute_status
  label: Mute Status
  type: enum
  values:
    - "0"
    - "1"
  description: "Query MUTE???? — 0=not mute, 1=mute"
- id: volume
  label: Volume
  type: integer
  description: "Query VOLM???? — range 0-100"
- id: tv_speaker
  label: TV Speaker Status
  type: enum
  values:
    - "0"
    - "2"
  description: "Query ASPK???? — 0=Off, 2=On"
- id: sound_mode
  label: Current Sound Mode
  type: enum
  values:
    - "0"
    - "2"
    - "3"
    - "4"
    - "5"
  description: "Query AMOD???? — 0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night"
```

## Variables
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "RS-232 port must be enabled in Custom Install menu (code 7310) before serial control works"
    source_line: "130-133"
  - description: "Power On Command (PWRE) must be set to Enable to allow remote power-on from standby mode"
    source_line: "135"
  - description: "POWER ON INPUT SELECT (POIS) allows TV to boot to specific input when powered on via RS-232; confirm intended input before sending POWR0001 if POIS is set to non-Last value"
    source_line: "427"
```

## Notes
**RS-232 Protocol Details:**
- Command format: `S[CLIENT_ID][COMMAND][DATA][CHECKSUM][CR]` where CR = 0x0D
- Query format: `Q[CLIENT_ID][COMMAND]????[CHECKSUM][CR]`
- CLIENT_ID: last 3 bytes of TV Ethernet MAC address (e.g. "5FA"), or "ALL" for broadcast
- CHECKSUM: 8-bit checksum of whole string (including CHECKSUM byte) equals zero
- Protocol is case sensitive

**IR Discrete Codes:**
- Pronto CCF hex codes provided for each discrete function
- Codes use consistent 04FB prefix (LOW CUSTOM 04, HIGH CUSTOM FB complement 8B)
- Example: POWER TOGGLE = 04FB708F, POWER ON = 04FB718E, POWER OFF = 04FB728D

**Serial connector:** Female DB9 D-sub chassis mount; use null-modem cable to connect to PC
<!-- UNRESOLVED: Ethernet/network control not present in this source (no TCP/IP commands documented) -->
<!-- UNRESOLVED: HTTP/REST API not present in this source -->
<!-- UNRESOLVED: UDP/OSC not present in this source -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-14T18:17:16.007Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:16.007Z
matched_actions: 39
action_count: 44
confidence: high
summary: "All spec actions matched literally in source; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
