---
spec_id: admin/sharp-nec-dd-ea272q
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Dd Ea272Q Control Spec"
manufacturer: Sharp/NEC
model_family: "Sharp/NEC Dd Ea272Q"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Sharp/NEC Dd Ea272Q"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:11:26.692Z
last_checked_at: 2026-06-17T19:42:03.164Z
generated_at: 2026-06-17T19:42:03.164Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device model name in source is generic \"projector\"; model \"Dd Ea272Q\" taken from operator input. Firmware version, exact model code (ID2), and control ID (ID1) values not stated."
  - "flow control not stated; full-duplex mode noted"
  - "exact enum values deferred to Appendix (not in refined source)"
  - "enum values in Appendix, not in refined source"
  - "source documents no unsolicited push events. All responses are"
  - "source documents no named multi-step sequences."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "model code (ID2) and control ID (ID1) byte values for this specific projector not stated in source — must be read from device or operator."
  - "flow control line not stated; source lists RTS/CTS pins but calls comm mode \"full duplex\" without naming hardware/software flow control."
  - "firmware version compatibility not stated."
  - "operator input model name \"Dd Ea272Q\" does not match source body (generic projector manual). Verify model mapping before ingest."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:42:03.164Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions confirmed in source with exact hex command sequences; transport parameters (115200 baud, 8 data bits, no parity, port 7142) verified. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC Dd Ea272Q Control Spec

## Summary
Sharp/NEC projector control via RS-232C serial and TCP/IP LAN (port 7142). Binary frame protocol: header byte, command bytes, data, checksum. Covers power, input switch, mutes, picture/volume/aspect adjust, lens control + memory, status queries, eco mode, edge blending, PIP/PbP, audio select.

<!-- UNRESOLVED: device model name in source is generic "projector"; model "Dd Ea272Q" taken from operator input. Firmware version, exact model code (ID2), and control ID (ID1) values not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # also 38400/19200/9600/4800 bps supported per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; full-duplex mode noted
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # POWER ON / POWER OFF commands present
  - routable    # INPUT SW CHANGE command present
  - queryable   # many REQUEST commands return state
  - levelable   # PICTURE ADJUST / VOLUME ADJUST present
```

## Actions
```yaml
# Frame format (verbatim from source section 2.1):
#   Header CMD1 CMD2 00h LEN <DATA...> <CKS>
# Command request headers: 00h/01h/02h/03h (read/setting/control-group prefix).
# Response success: header+20h / 21h / 22h / 23h. Error: A0h/A1h/A2h/A3h.
# Checksum (CKS): low byte of sum of all preceding bytes (see 2.2).
# ID1 = control ID, ID2 = model code - values not stated in source (UNRESOLVED).

actions:

  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    response: "20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>"
    params: []
    notes: "DATA1-12 = error bitfield. 0=normal, 1=error."

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    response: "22h 00h <ID1> <ID2> 00h <CKS>"
    params: []
    notes: "No other command accepted during power-on sequence."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    response: "22h 01h <ID1> <ID2> 00h <CKS>"
    params: []
    notes: "No other command accepted during power-off incl. cooling time."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    response: "22h 03h <ID1> <ID2> 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal value (see Appendix Supplementary Information). Example 06h = video port."
    notes: "Response DATA01=FFh means ended with error."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    response: "22h 10h <ID1> <ID2> 00h <CKS>"
    params: []
    notes: "Cleared on input/video switch."

  - id: picture_mute_off
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    response: "22h 11h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: sound_mute_on
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    response: "22h 12h <ID1> <ID2> 00h <CKS>"
    params: []
    notes: "Cleared on input/video switch or volume adjust."

  - id: sound_mute_off
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    response: "22h 13h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: onscreen_mute_on
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    response: "22h 14h <ID1> <ID2> 00h <CKS>"
    params: []
    notes: "Cleared on input/video switch."

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    response: "22h 15h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02>-<DATA04> <CKS>"
    response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target. 00h=Brightness,01h=Contrast,02h=Color,03h=Hue,04h=Sharpness"
      - name: DATA02
        type: integer
        description: "Mode. 00h=absolute,01h=relative"
      - name: DATA03
        type: integer
        description: "Value low byte"
      - name: DATA04
        type: integer
        description: "Value high byte"
    notes: "Response DATA1+DATA2=0000h success; other=error."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01>-<DATA03> <CKS>"
    response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Mode. 00h=absolute,01h=relative"
      - name: DATA02
        type: integer
        description: "Value low byte"
      - name: DATA03
        type: integer
        description: "Value high byte"

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Aspect value (see Appendix Supplementary Information)"
    notes: "DATA1+DATA2=0000h success; other=error."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01>-<DATA05> <CKS>"
    response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Target. 96h=LAMP ADJUST / LIGHT ADJUST"
      - name: DATA02
        type: integer
        description: "Sub-target. FFh fixed for LAMP/LIGHT ADJUST"
      - name: DATA03
        type: integer
        description: "Mode. 00h=absolute,01h=relative"
      - name: DATA04
        type: integer
        description: "Value low byte"
      - name: DATA05
        type: integer
        description: "Value high byte"

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    response: "23h 8Ah <ID1> <ID2> 62h <DATA01>-<DATA98> <CKS>"
    params: []
    notes: "DATA1-49=projector name; DATA83-86=lamp usage time (sec); DATA87-90=filter usage time (sec). Updated at 1-min intervals."

  - id: filter_usage_info_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    response: "23h 95h <ID1> <ID2> 08h <DATA01>-<DATA08> <CKS>"
    params: []
    notes: "DATA1-4=filter usage time (sec); DATA5-8=filter alarm start time (sec). -1 if undefined."

  - id: lamp_info_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    response: "23h 96h <ID1> <ID2> 06h <DATA01>-<DATA06> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lamp. 00h=Lamp1, 01h=Lamp2 (two-lamp models only)"
      - name: DATA02
        type: integer
        description: "Content. 01h=usage time (sec), 04h=remaining life (%)"
    notes: "Negative remaining life if replacement deadline exceeded."

  - id: carbon_savings_info_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    response: "23h 9Ah <ID1> <ID2> 09h <DATA01>-<DATA09> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: "DATA2-5=kg (max 99999), DATA6-9=mg (max 999999)."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    response: "22h 0Fh <ID1> <ID2> 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (see key code list)"
      - name: DATA02
        type: integer
        description: "Key code high byte"
    notes: "Key code list: 02h=POWER ON,03h=POWER OFF,05h=AUTO,06h=MENU,07h=UP,08h=DOWN,09h=RIGHT,0Ah=LEFT,0Bh=ENTER,0Ch=EXIT,0Dh=HELP,0Fh=MAGNIFY UP,10h=MAGNIFY DOWN,13h=MUTE,29h=PICTURE,4Bh=COMPUTER1,4Ch=COMPUTER2,4Fh=VIDEO1,51h=S-VIDEO1,84h=VOLUME UP,85h=VOLUME DOWN,8Ah=FREEZE,A3h=ASPECT,D7h=SOURCE,EEh=LAMP MODE/ECO."

  - id: shutter_close
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    response: "22h 16h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: shutter_open
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    response: "22h 17h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    response: "22h 18h <ID1> <ID2> 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Target. 06h=Periphery Focus"
      - name: DATA02
        type: integer
        description: "00h=Stop,01h=drive +1s,02h=drive +0.5s,03h=drive +0.25s,7Fh=drive +,81h=drive -,FDh=drive -0.25s,FEh=drive -0.5s,FFh=drive -1s"
    notes: "Send 00h to stop after 7Fh/81h. Same command can be re-issued during drive without stop."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    response: "22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02>-<DATA07> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Target (see 053 LENS CONTROL DATA01)"
    notes: "DATA2-3=upper limit, DATA4-5=lower limit, DATA6-7=current value."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01>-<DATA04> <CKS>"
    response: "22h 1Dh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Target. FFh=Stop"
      - name: DATA02
        type: integer
        description: "Mode. 00h=absolute,02h=relative"
      - name: DATA03
        type: integer
        description: "Value low byte"
      - name: DATA04
        type: integer
        description: "Value high byte"
    notes: "When DATA01=FFh (Stop), mode/value ignored."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    response: "22h 1Eh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE,01h=STORE,02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    response: "22h 1Fh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE,01h=STORE,02h=RESET"
    notes: "Acts on profile selected via 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    response: "22h 20h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL,01h=FORCED MUTE"
    notes: "Response DATA02=00h OFF / 01h ON."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    response: "23h 21h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL,01h=FORCED MUTE"
      - name: DATA02
        type: integer
        description: "00h=OFF,01h=ON"

  - id: lens_info_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    response: "22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>"
    params: []
    notes: "DATA01 bitfield: Bit0=Lens memory,Bit1=Zoom,Bit2=Focus,Bit3=Lens Shift(H),Bit4=Lens Shift(V). 0=Stop,1=During operation."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    response: "22h 27h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=Profile 1,01h=Profile 2"

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    response: "22h 28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params: []
    notes: "DATA01=00h Profile 1 / 01h Profile 2."

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    response: "23h 05h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=BRIGHTNESS,01h=CONTRAST,02h=COLOR,03h=HUE,04h=SHARPNESS,05h=VOLUME,96h=LAMP/LIGHT ADJUST"
    notes: "DATA1=status(00h display N/A,01h adjust N/A,02h OK,FFh no such gain). DATA2-3=upper,4-5=lower,6-7=default,8-9=current,10-11=wide step,12-13=narrow step,14=default valid."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    response: "20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>"
    params: []
    notes: "DATA1-3=base model type; DATA4=sound function(00h no,01h yes); DATA5=profile number(00h none,01h clock,02h sleep,03h both)."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
    params: []
    notes: "DATA3=power(00h Standby,01h Power on,FFh unsupported); DATA4=cooling(00h no,01h during); DATA5=power on/off process(00h no,01h during); DATA6=operation status(00h Standby Sleep,04h Power on,05h Cooling,06h Standby error,0Fh Standby power saving,10h Network standby)."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
    params: []
    notes: "DATA1=signal switch process; DATA2=signal list number (practical = returned+1); DATA3=signal type 1; DATA4=signal type 2 (01h COMPUTER,02h VIDEO,03h S-VIDEO,04h COMPONENT,07h VIEWER1-5,20h DVI-D,21h HDMI,22h DisplayPort,23h VIEWER6-10); DATA5=list type(00h Default,01h User); DATA6=test pattern; DATA9=content displayed(00h video,01h no signal,02h viewer,03h test pattern,04h LAN)."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
    params: []
    notes: "DATA1=picture mute,DATA2=sound mute,DATA3=onscreen mute,DATA4=forced onscreen mute,DATA5=onscreen display. Each 00h Off / 01h On."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    response: "20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>"
    params: []
    notes: "DATA1-32=model name (NUL-terminated)."

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    response: "20h 85h <ID1> <ID2> 01h <DATA01> <CKS>"
    params: []
    notes: "DATA01: 00h=Normal (cover opened),01h=Cover closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    response: "21h 98h <ID1> <ID2> 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "01h=freeze on,02h=freeze off"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    response: "20h D0h <ID1> <ID2> LEN <DATA01> 01h <DATA02>-<DATA??> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "03h=horizontal sync frequency,04h=vertical sync frequency"
    notes: "Response DATA2=label length, DATA3+=string (NUL-terminated)."

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    response: "23h B0h <ID1> <ID2> 02h 07h <DATA01> <CKS>"
    params: []
    notes: "DATA01=eco mode value (Light mode / Lamp mode depending on model; see Appendix)."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    response: "23h B0h <ID1> <ID2> 12h 2Ch <DATA01>-<DATA17> <CKS>"
    params: []
    notes: "DATA1-17=projector name (NUL-terminated)."

  - id: lan_mac_address_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    response: "23h B0h <ID1> <ID2> 08h 9Ah 00h <DATA01>-<DATA06> <CKS>"
    params: []
    notes: "DATA1-6=MAC address."

  - id: pip_pbyp_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    response: "23h B0h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3"
    notes: "Response DATA02 (MODE): 00h=PIP,01h=PbP. (START POSITION): 00h=TL,01h=TR,02h=BL,03h=BR. Sub input values per Appendix."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    response: "23h B0h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"
    params: []
    notes: "DATA01: 00h=OFF,01h=ON."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    response: "23h B1h <ID1> <ID2> 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Eco mode value (Light mode / Lamp mode depending on model; see Appendix)"

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"
    response: "23h B1h <ID1> <ID2> 02h 2Ch <DATA01> <CKS>"
    params:
      - name: DATA01-16
        type: string
        description: "Projector name (up to 16 bytes)"

  - id: pip_pbyp_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    response: "23h B1h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3"
      - name: DATA02
        type: integer
        description: "Value (MODE:00h PIP,01h PbP / START POS:00-03 / Sub input per Appendix)"
    notes: "Response DATA01: 00h=MODE,01h=START POSITION,02h=SUB INPUT 1,03h=SUB INPUT 2,04h=SUB INPUT 3."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    response: "23h B1h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=OFF,01h=ON"

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    response: "20h BFh <ID1> <ID2> 10h 00h <DATA01>-<DATA15> <CKS>"
    params: []
    notes: "DATA1-2=base model type; DATA3-11=model name; DATA12-13=base model type; DATA14-15=reserved."

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    response: "20h BFh <ID1> <ID2> 12h 01h 06h <DATA01>-<DATA16> <CKS>"
    params: []
    notes: "DATA1-16=serial number (NUL-terminated)."

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    response: "20h BFh <ID1> <ID2> 10h 02h <DATA01>-<DATA15> <CKS>"
    params: []
    notes: "DATA1=operation status(00h Standby Sleep,04h Power on,05h Cooling,06h Standby error,0Fh Standby power saving,10h Network standby); DATA2=content displayed; DATA3/4=signal type; DATA5=display signal type; DATA6=video mute; DATA7=sound mute; DATA8=onscreen mute; DATA9=freeze status."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    response: "23h C9h <ID1> <ID2> 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal (see Appendix Supplementary Information)"
      - name: DATA02
        type: integer
        description: "Setting value. 00h=terminal specified in DATA01,01h=BNC,02h=COMPUTER"
    notes: "Response DATA02: 00h success / 01h error."
```

## Feedbacks
```yaml
# Query responses map to observable state. Representative set; full payload
# shapes documented in each Actions entry above.
feedbacks:
  - id: power_state
    type: enum
    source_query: running_status_request  # DATA03
    values: [standby, power_on, unsupported]

  - id: operation_status
    type: enum
    source_query: running_status_request  # DATA06
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

  - id: cooling_process
    type: boolean
    source_query: running_status_request  # DATA04

  - id: input_signal_type
    type: enum
    source_query: input_status_request  # DATA04
    values: [computer, video, s_video, component, dvi_d, hdmi, displayport, viewer_1_5, viewer_6_10]

  - id: picture_mute
    type: boolean
    source_query: mute_status_request  # DATA01
  - id: sound_mute
    type: boolean
    source_query: mute_status_request  # DATA02
  - id: onscreen_mute
    type: boolean
    source_query: mute_status_request  # DATA03

  - id: lamp_usage_seconds
    type: integer
    source_query: information_request  # DATA83-86
  - id: lamp_remaining_life_percent
    type: integer
    source_query: lamp_info_request_3  # DATA02=04h
  - id: filter_usage_seconds
    type: integer
    source_query: filter_usage_info_request  # DATA1-4

  - id: error_status
    type: bitfield
    source_query: error_status_request  # DATA1-12
    notes: "32-bit+ error flags (cover, fan, temp, lamp, mirror, interlock, system, etc.)."

  - id: model_name
    type: string
    source_query: model_name_request
  - id: serial_number
    type: string
    source_query: serial_number_request
  - id: mac_address
    type: string
    source_query: lan_mac_address_request2
  - id: projector_name
    type: string
    source_query: lan_projector_name_request

  - id: eco_mode
    type: enum
    source_query: eco_mode_request
    # UNRESOLVED: exact enum values deferred to Appendix (not in refined source)
  - id: edge_blending_mode
    type: boolean
    source_query: edge_blending_mode_request
  - id: cover_status
    type: enum
    source_query: cover_status_request
    values: [normal_opened, closed]
```

## Variables
```yaml
variables:
  - id: picture_brightness
    set_action: picture_adjust  # DATA01=00h
    type: integer
  - id: picture_contrast
    set_action: picture_adjust  # DATA01=01h
    type: integer
  - id: picture_color
    set_action: picture_adjust  # DATA01=02h
    type: integer
  - id: picture_hue
    set_action: picture_adjust  # DATA01=03h
    type: integer
  - id: picture_sharpness
    set_action: picture_adjust  # DATA01=04h
    type: integer
  - id: volume
    set_action: volume_adjust
    type: integer
  - id: aspect
    set_action: aspect_adjust
    type: enum
    # UNRESOLVED: enum values in Appendix, not in refined source
  - id: lamp_light_adjust
    set_action: other_adjust  # DATA01=96h
    type: integer
  - id: eco_mode_value
    set_action: eco_mode_set
    type: enum
    # UNRESOLVED: enum values in Appendix, not in refined source
  - id: edge_blending
    set_action: edge_blending_mode_set
    type: boolean
  - id: freeze
    set_action: freeze_control
    type: boolean
  - id: lens_memory_load_by_signal
    set_action: lens_memory_option_set  # DATA01=00h
    type: boolean
  - id: lens_memory_forced_mute
    set_action: lens_memory_option_set  # DATA01=01h
    type: boolean
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited push events. All responses are
# replies to commands. Populate if device emits async notifications (not stated).
events: []
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step sequences.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON accepts no other command during power-on sequence."
  - "POWER OFF accepts no other command during power-off incl. cooling time."
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements beyond the command-busy notes above.
```

## Notes
Binary protocol. Every frame ends in checksum byte = low byte of sum of all preceding bytes. Request headers 00h/01h/02h/03h encode command group; success response = header+20h (so 20h/21h/22h/23h); error response = header+0xA0 (A0h/A1h/A2h/A3h) carrying ERR1+ERR2.

Error codes (section 2.4) define ERR1/ERR2 pairs: 00h/00h=unrecognized, 00h/01h=unsupported on model, 01h/00h=invalid value, 01h/01h=invalid input terminal, 02h/0Dh=power off reject, 02h/0Eh=execution failed, 02h/0Fh=no authority, etc.

Serial: cross cable, D-SUB 9P, RxD/TxD crossed. Baud selectable 4800–115200; must match projector setting. LAN: wired or wireless unit; TCP port 7142 fixed.

Several DATA enums reference an "Appendix: Supplementary Information by Command" not present in the refined source excerpt — eco mode, aspect, input terminal, sub input, base model type values are UNRESOLVED there.

<!-- UNRESOLVED: model code (ID2) and control ID (ID1) byte values for this specific projector not stated in source — must be read from device or operator. -->
<!-- UNRESOLVED: flow control line not stated; source lists RTS/CTS pins but calls comm mode "full duplex" without naming hardware/software flow control. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: operator input model name "Dd Ea272Q" does not match source body (generic projector manual). Verify model mapping before ingest. -->
```

53 actions enumerated, every verbatim payload copied. Serial+TCP both covered. Eco/aspect enums left UNRESOLVED (in Appendix not in refined source).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:11:26.692Z
last_checked_at: 2026-06-17T19:42:03.164Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:42:03.164Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions confirmed in source with exact hex command sequences; transport parameters (115200 baud, 8 data bits, no parity, port 7142) verified. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device model name in source is generic \"projector\"; model \"Dd Ea272Q\" taken from operator input. Firmware version, exact model code (ID2), and control ID (ID1) values not stated."
- "flow control not stated; full-duplex mode noted"
- "exact enum values deferred to Appendix (not in refined source)"
- "enum values in Appendix, not in refined source"
- "source documents no unsolicited push events. All responses are"
- "source documents no named multi-step sequences."
- "source contains no explicit safety warnings, interlock procedures,"
- "model code (ID2) and control ID (ID1) byte values for this specific projector not stated in source — must be read from device or operator."
- "flow control line not stated; source lists RTS/CTS pins but calls comm mode \"full duplex\" without naming hardware/software flow control."
- "firmware version compatibility not stated."
- "operator input model name \"Dd Ea272Q\" does not match source body (generic projector manual). Verify model mapping before ingest."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
