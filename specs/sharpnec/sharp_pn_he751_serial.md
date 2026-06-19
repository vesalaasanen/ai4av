---
spec_id: admin/sharp-nec-pn-he751
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PN-HE751 Control Spec"
manufacturer: Sharp/NEC
model_family: PN-HE751
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - PN-HE751
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:57:31.223Z
last_checked_at: 2026-06-18T09:07:06.787Z
generated_at: 2026-06-18T09:07:06.787Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device model name \"PN-HE751\" supplied by operator; source manual is a generic \"Projector Control Command Reference\" with no model-specific cover page. Confirm model match."
  - "firmware version compatibility not stated in source."
  - "source states \"Full duplex\" communication mode; RTS/CTS pins are wired in the D-SUB 9P pinout but no explicit hardware flow-control procedure is described. Treated as none."
  - "other DATA01 target codes not enumerated in this source excerpt.\""
  - "eco-mode, aspect, input-terminal, sub-input, base-model-type code"
  - "source describes no unsolicited notifications / push events."
  - "source documents no explicit multi-step command sequences."
  - "no explicit power-on sequencing procedure documented in this source excerpt."
  - "model name \"PN-HE751\" supplied by operator; not verifiable from this generic projector manual."
  - "flow_control not explicitly specified (only \"Full duplex\" communication mode stated)."
  - "Appendix 'Supplementary Information by Command' (input terminal, aspect, eco mode, sub-input, base model type codes) not present in this source excerpt."
  - "other LENS CONTROL DATA01 target codes besides 06h (Periphery Focus) not enumerated in this excerpt."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:07:06.787Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PN-HE751 Control Spec

## Summary
The Sharp/NEC PN-HE751 is a large-format professional LCD display controlled via a binary RS-232C or TCP/IP command protocol. This spec covers the full hex command catalogue documented in the vendor Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mute, picture/volume/aspect/gain adjustment, lens and lens-memory control, shutter, freeze, eco mode, edge blending, PIP/PbP, and a wide set of status/information queries.

<!-- UNRESOLVED: device model name "PN-HE751" supplied by operator; source manual is a generic "Projector Control Command Reference" with no model-specific cover page. Confirm model match. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Transport
```yaml
# Both RS-232C serial and LAN (TCP) are documented in the source. The command
# payload framing is identical across both transports.
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # one of 4800/9600/19200/38400/115200 bps (selectable); 9600 shown as representative default
  baud_rate_options: [4800, 9600, 19200, 38400, 115200]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode; RTS/CTS pins are wired in the D-SUB 9P pinout but no explicit hardware flow-control procedure is described. Treated as none.
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth/login procedure in source
# Framing notes (from section 2.1 / 2.2):
#  - Commands and responses are hex byte sequences.
#  - <ID1> = control ID configured on the projector.
#  - <ID2> = model code (varies by model).
#  - <CKS> = checksum = low-order byte of the sum of all preceding bytes.
#  - Example checksum from source: 20h+81h+01h+60h+01h+00h = 103h -> CKS = 03h.
```

## Traits
```yaml
- powerable  # inferred from POWER ON / POWER OFF commands
- queryable  # inferred from many *REQUEST/*STATUS QUERY commands
- routable   # inferred from INPUT SW CHANGE and PIP/PbP sub-input selection
- levelable  # inferred from VOLUME ADJUST, PICTURE ADJUST, LENS CONTROL, LAMP/LIGHT ADJUST
```

## Actions
```yaml
# All payloads are hex bytes, verbatim from the source. Placeholders in braces
# {DATA??}/{CKS}/{ID1}/{ID2} are per-source parameters. CKS = checksum computed
# as low byte of sum of all preceding bytes (see Transport framing notes).

# --- 009. ERROR STATUS REQUEST ---
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response: 20h 88h {ID1} {ID2} 0Ch {DATA01}-{DATA12} {CKS}. DATA01-12 are error bitmasks (bit=1 means error). DATA09 holds extended status incl. interlock-switch-open (Bit1) and system errors."

# --- 015. POWER ON ---
- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "While turning power on, no other command accepted. Response ACK: 22h 00h {ID1} {ID2} 00h {CKS}. Error NAK: A2h 00h {ID1} {ID2} 02h {ERR1} {ERR2} {CKS}."

# --- 016. POWER OFF ---
- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "During power-off (incl. cooling time) no other command accepted. ACK: 22h 01h {ID1} {ID2} 00h {CKS}."

# --- 018. INPUT SW CHANGE ---
- id: input_switch_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal code. Example from source: 06h = video port. Full code list in Appendix 'Supplementary Information by Command' (not present in this source excerpt)."
  notes: "Response: 22h 03h {ID1} {ID2} 01h {DATA01} {CKS}; DATA01=FFh means error (no switch). Example with 06h: '02h 03h 00h 00h 02h 01h 06h 0Eh'."

# --- 020. PICTURE MUTE ON ---
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared by input switch or video signal switch."

# --- 021. PICTURE MUTE OFF ---
- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

# --- 022. SOUND MUTE ON ---
- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Cleared by input switch, video signal switch, or volume adjustment."

# --- 023. SOUND MUTE OFF ---
- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

# --- 024. ONSCREEN MUTE ON ---
- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: "Cleared by input switch or video signal switch."

# --- 025. ONSCREEN MUTE OFF ---
- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

# --- 030-1. PICTURE ADJUST ---
- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: DATA03_DATA04
      type: integer
      description: "Adjustment value (16-bit, low byte DATA03 / high byte DATA04)."
  notes: "Response: 23h 10h {ID1} {ID2} 02h {DATA01} {DATA02} {CKS}; 0000h=success. Source examples: brightness=10 -> '03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h'; brightness=-10 -> '03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch'."

# --- 030-2. VOLUME ADJUST ---
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: DATA02_DATA03
      type: integer
      description: "Adjustment value (16-bit, low/high)."
  notes: "Source example volume=10: '03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h'."

# --- 030-12. ASPECT ADJUST ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value. Full list in Appendix 'Supplementary Information by Command' (not present in this source excerpt)."

# --- 030-15. OTHER ADJUST (LAMP/LIGHT ADJUST) ---
- id: lamp_light_adjust
  label: Lamp/Light Adjust (Other Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01_DATA02
      type: integer
      description: "Adjustment target. Source-stated combination: DATA01=96h, DATA02=FFh -> LAMP ADJUST / LIGHT ADJUST."
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: DATA04_DATA05
      type: integer
      description: "Adjustment value (16-bit, low/high)."

# --- 037. INFORMATION REQUEST ---
- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Response: 23h 8Ah {ID1} {ID2} 62h {DATA01}-{DATA98} {CKS}. DATA01-49=projector name (NUL-terminated); DATA83-86=lamp usage time (seconds); DATA87-90=filter usage time (seconds). Updated 1-min intervals."

# --- 037-3. FILTER USAGE INFORMATION REQUEST ---
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Response: 23h 95h {ID1} {ID2} 08h {DATA01}-{DATA08} {CKS}. DATA01-04=filter usage time (s); DATA05-08=filter alarm start time (s); '-1' returned if undefined."

# --- 037-4. LAMP INFORMATION REQUEST 3 ---
- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (Lamp 2 only valid on two-lamp models)."
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (s), 04h=lamp remaining life (%)."
  notes: "Response: 23h 96h {ID1} {ID2} 06h {DATA01} {DATA02} {DATA03}-{DATA06} {CKS}. Remaining life negative if replacement deadline exceeded. Example usage-time query: '03h 96h 00h 00h 02h 00h 01h 9Ch'."

# --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
  notes: "Response: 23h 9Ah {ID1} {ID2} 09h {DATA01}-{DATA09} {CKS}. DATA02-05=kg (max 99999), DATA06-09=mg (max 999999). Source example 2460.06375 kg returns '...00h 9Ch 90h 00h 00h 06h F9h 00h 00h'."

# --- 050. REMOTE KEY CODE ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01_DATA02
      type: integer
      description: "WORD key code. Source key-code list: 02h/00h=POWER ON, 03h/00h=POWER OFF, 05h/00h=AUTO, 06h/00h=MENU, 07h/00h=UP, 08h/00h=DOWN, 09h/00h=RIGHT, 0Ah/00h=LEFT, 0Bh/00h=ENTER, 0Ch/00h=EXIT, 0Dh/00h=HELP, 0Fh/00h=MAGNIFY UP, 10h/00h=MAGNIFY DOWN, 13h/00h=MUTE, 29h/00h=PICTURE, 4Bh/00h=COMPUTER1, 4Ch/00h=COMPUTER2, 4Fh/00h=VIDEO1, 51h/00h=S-VIDEO1, 84h/00h=VOLUME UP, 85h/00h=VOLUME DOWN, 8Ah/00h=FREEZE, A3h/00h=ASPECT, D7h/00h=SOURCE, EEh/00h=LAMP MODE/ECO."
  notes: "Response: 22h 0Fh {ID1} {ID2} 01h {DATA01} {CKS}; DATA01=FFh means error. Source example AUTO: '02h 0Fh 00h 00h 02h 05h 00h 18h'."

# --- 051. SHUTTER CLOSE ---
- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

# --- 052. SHUTTER OPEN ---
- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

# --- 053. LENS CONTROL ---
- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target. Source-stated value: 06h=Periphery Focus. # UNRESOLVED: other DATA01 target codes not enumerated in this source excerpt."
    - name: DATA02
      type: integer
      description: "Drive command: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s."
  notes: "Response: 22h 18h {ID1} {ID2} 01h {DATA01} {CKS}; DATA01=FFh means error. Continuous-drive (7Fh/81h) must be stopped by sending DATA02=00h."

# --- 053-1. LENS CONTROL REQUEST ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (same space as 053 LENS CONTROL DATA01)."
  notes: "Response: 22h 1Ch {ID1} {ID2} 08h {DATA01} 00h {DATA02}-{DATA07} {CKS}. DATA02-03=upper limit, DATA04-05=lower limit, DATA06-07=current value."

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target, or FFh=Stop (when FFh, mode/value ignored)."
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative."
    - name: DATA03_DATA04
      type: integer
      description: "Adjustment value (16-bit, low/high)."

# --- 053-3. LENS MEMORY CONTROL ---
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
  notes: "Response echoes DATA01; FFh means error."

# --- 053-4. REFERENCE LENS MEMORY CONTROL ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
  notes: "Operates on the profile number selected via 053-10 LENS PROFILE SET."

# --- 053-5. LENS MEMORY OPTION REQUEST ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
  notes: "Response: 22h 20h {ID1} {ID2} 02h {DATA01} {DATA02} {CKS}. DATA02: 00h=OFF, 01h=ON."

# --- 053-6. LENS MEMORY OPTION SET ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: DATA02
      type: integer
      description: "Setting: 00h=OFF, 01h=ON."

# --- 053-7. LENS INFORMATION REQUEST ---
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Response: 22h 22h {ID1} {ID2} 02h 00h {DATA01} {CKS}. DATA01 bitmask of lens operation state: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) (0=Stop, 1=During operation); Bits5-7 reserved."

# --- 053-10. LENS PROFILE SET ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2."

# --- 053-11. LENS PROFILE REQUEST ---
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Response: 22h 28h {ID1} {ID2} 02h {DATA01} {DATA02} {CKS}. DATA01: 00h=Profile 1, 01h=Profile 2; DATA02 reserved."

# --- 060-1. GAIN PARAMETER REQUEST 3 ---
- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
  notes: "Response: 23h 05h {ID1} {ID2} 10h {DATA01}-{DATA16} {CKS}. DATA01=status (00h display-N/A, 01h adjust-N/A, 02h adjust-OK, FFh gain missing); DATA02-09 limits/default/current; DATA10-13 wide/narrow adjustment widths; DATA14 default valid (00h/01h)."

# --- 078-1. SETTING REQUEST ---
- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Response: 20h 85h {ID1} {ID2} 20h {DATA01}-{DATA32} {CKS}. DATA01-03=base model type; DATA04=sound function (00h N/A, 01h available); DATA05=profile number (00h none, 01h clock, 02h sleep timer, 03h clock+sleep)."

# --- 078-2. RUNNING STATUS REQUEST ---
- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Response: 20h 85h {ID1} {ID2} 10h {DATA01}-{DATA16} {CKS}. DATA03=power status (00h Standby, 01h Power on, FFh unsupported); DATA04=cooling (00h no, 01h during); DATA05=power on/off process; DATA06=operation status (00h Standby-Sleep, 04h Power on, 05h Cooling, 06h Standby-error, 0Fh Standby-Power saving, 10h Network standby)."

# --- 078-3. INPUT STATUS REQUEST ---
- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Response: 20h 85h {ID1} {ID2} 10h {DATA01}-{DATA16} {CKS}. DATA01=signal switch process; DATA02=signal list number (practical value = returned + 1); DATA03=selection signal type 1; DATA04=selection signal type 2 (01h COMPUTER, 02h VIDEO, 03h S-VIDEO, 04h COMPONENT, 07h VIEWER 1-5, 20h DVI-D, 21h HDMI, 22h DisplayPort, 23h VIEWER 6-10); DATA09=content displayed."

# --- 078-4. MUTE STATUS REQUEST ---
- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Response: 20h 85h {ID1} {ID2} 10h {DATA01}-{DATA16} {CKS}. DATA01=picture mute, DATA02=sound mute, DATA03=onscreen mute, DATA04=forced onscreen mute, DATA05=onscreen display (each 00h Off / 01h On)."

# --- 078-5. MODEL NAME REQUEST ---
- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Response: 20h 85h {ID1} {ID2} 20h {DATA01}-{DATA32} {CKS}. DATA01-32=model name (NUL-terminated)."

# --- 078-6. COVER STATUS REQUEST ---
- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Response: 20h 85h {ID1} {ID2} 01h {DATA01} {CKS}. DATA01: 00h=Normal (cover opened), 01h=Cover closed."

# --- 079. FREEZE CONTROL ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze ON, 02h=freeze OFF."
  notes: "Response: 21h 98h {ID1} {ID2} 01h {DATA01} {CKS}."

# --- 084. INFORMATION STRING REQUEST ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency."
  notes: "Response: 20h D0h {ID1} {ID2} {LEN} {DATA01} 01h {DATA02}-{DATA??} {CKS}. DATA02=label/string length; DATA03+ = label/info string (NUL-terminated)."

# --- 097-8. ECO MODE REQUEST ---
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Response: 23h B0h {ID1} {ID2} 02h 07h {DATA01} {CKS}. DATA01=eco mode value (Light mode or Lamp mode depending on model). Full value list in Appendix."

# --- 097-45. LAN PROJECTOR NAME REQUEST ---
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Response: 23h B0h {ID1} {ID2} 12h 2Ch {DATA01}-{DATA17} {CKS}. DATA01-17=projector name (NUL-terminated)."

# --- 097-155. LAN MAC ADDRESS STATUS REQUEST 2 ---
- id: lan_mac_address_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Response: 23h B0h {ID1} {ID2} 08h 9Ah 00h {DATA01}-{DATA06} {CKS}. DATA01-06=MAC address bytes."

# --- 097-198. PIP/PICTURE BY PICTURE REQUEST ---
- id: pip_pbp_request
  label: PIP/Picture-by-Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
  notes: "Response: 23h B0h {ID1} {ID2} 03h C5h {DATA01} {DATA02} {CKS}. DATA02 depends on target: MODE (00h PIP / 01h PbP); START POSITION (00h TL / 01h TR / 02h BL / 03h BR); SUB INPUTs use values from Appendix."

# --- 097-243-1. EDGE BLENDING MODE REQUEST ---
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Response: 23h B0h {ID1} {ID2} 03h DFh 00h {DATA01} {CKS}. DATA01: 00h=OFF, 01h=ON."

# --- 098-8. ECO MODE SET ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value (Light mode or Lamp mode depending on model). Full value list in Appendix."

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
  params:
    - name: DATA01_DATA16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated by trailing 00h)."

# --- 098-198. PIP/PICTURE BY PICTURE SET ---
- id: pip_pbp_set
  label: PIP/Picture-by-Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: DATA02
      type: integer
      description: "Setting value (target-dependent: MODE 00h PIP/01h PbP; START POSITION 00h-03h corners; SUB INPUT uses Appendix values)."

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Setting: 00h=OFF, 01h=ON."

# --- 305-1. BASE MODEL TYPE REQUEST ---
- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Response: 20h BFh {ID1} {ID2} 10h 00h {DATA01}-{DATA15} {CKS}. DATA01-02=base model type; DATA03-11=model name (NUL-terminated); DATA12-13=base model type."

# --- 305-2. SERIAL NUMBER REQUEST ---
- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Response: 20h BFh {ID1} {ID2} 12h 01h 06h {DATA01}-{DATA16} {CKS}. DATA01-16=serial number (NUL-terminated)."

# --- 305-3. BASIC INFORMATION REQUEST ---
- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Response: 20h BFh {ID1} {ID2} 10h 02h {DATA01}-{DATA15} {CKS}. DATA01=operation status (00h/04h/05h/06h/0Fh/10h); DATA02=content displayed; DATA03-04=selection signal type; DATA05=display signal type; DATA06=video mute, DATA07=sound mute, DATA08=onscreen mute, DATA09=freeze status."

# --- 319-10. AUDIO SELECT SET ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (code list in Appendix 'Supplementary Information by Command')."
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
  notes: "Response: 23h C9h {ID1} {ID2} 03h 09h {DATA01} {DATA02} {CKS}; DATA02: 00h=success, 01h=error."
```

## Feedbacks
```yaml
# Generic response framing applies to every action/query (see source 2.3):
#  - Success ACK (no data):  {type-prefix} {cmd} {ID1} {ID2} 00h {CKS}
#  - Success ACK (with data): {type-prefix} {cmd} {ID1} {ID2} {LEN} {DATA...} {CKS}
#  - Error NAK:               A{type}h {cmd} {ID1} {ID2} 02h {ERR1} {ERR2} {CKS}
- id: command_result
  type: enum
  values: [ack, nak_error]
  description: "Per-command ACK/NAK. ERR1+ERR2 give the cause (see Error code list below)."

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "From 078-2 RUNNING STATUS DATA06: 00h Standby(Sleep), 04h Power on, 05h Cooling, 06h Standby(error), 0Fh Standby(Power saving), 10h Network standby."

- id: mute_state
  type: object
  description: "From 078-4 MUTE STATUS REQUEST: picture/sound/onscreen/forced-onscreen/onscreen-display flags."

- id: cover_state
  type: enum
  values: [normal_opened, closed]
  description: "From 078-6 COVER STATUS REQUEST DATA01."

- id: error_status
  type: bitmask
  description: "From 009 ERROR STATUS REQUEST DATA01-12. Includes cover/fan/temperature/power/lamp/interlock-switch-open/system-error bits (DATA09)."

# Error code list (ERR1 / ERR2) verbatim from source 2.4:
#  00h/00h = command not recognized
#  00h/01h = command not supported by model
#  01h/00h = specified value invalid
#  01h/01h = specified input terminal invalid
#  01h/02h = specified language invalid
#  02h/00h = memory allocation error
#  02h/02h = memory in use
#  02h/03h = specified value cannot be set
#  02h/04h = forced onscreen mute on
#  02h/06h = viewer error
#  02h/07h = no signal
#  02h/08h = a test pattern or filter is displayed
#  02h/09h = no PC card inserted
#  02h/0Ah = memory operation error
#  02h/0Ch = an entry list is displayed
#  02h/0Dh = command cannot be accepted because the power is off
#  02h/0Eh = command execution failed
#  02h/0Fh = no authority for the operation
#  03h/00h = specified gain number incorrect
#  03h/01h = specified gain invalid
#  03h/02h = adjustment failed
```

## Variables
```yaml
# Settable parameters surfaced via dedicated SET actions are modelled as Actions
# (see 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 053 LENS CONTROL, 098-* SETs).
# Current values readable via 060-1 GAIN PARAMETER REQUEST 3 and 053-1 LENS CONTROL REQUEST.
# No separate continuous variable list needed.
# UNRESOLVED: eco-mode, aspect, input-terminal, sub-input, base-model-type code
# enumerations are deferred to an Appendix ('Supplementary Information by Command')
# not present in this source excerpt.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications / push events.
# The protocol is strictly request/response (per 2.3 Responses).
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: during power-off incl. cooling time no other command accepted - implies a blocking transition
interlocks:
  - id: power_on_blocking
    description: "POWER ON: while turning power on, no other command can be accepted."
  - id: power_off_cooling_blocking
    description: "POWER OFF: during power-off (including cooling time), no other command can be accepted."
  - id: interlock_switch
    description: "009 ERROR STATUS REQUEST DATA09 Bit1 = 'The interlock switch is open.' Reported as an error condition."
  - id: cover_status
    description: "078-6 COVER STATUS REQUEST reports mirror/lens cover open vs closed."
# UNRESOLVED: no explicit power-on sequencing procedure documented in this source excerpt.
```

## Notes
- This is a binary hex protocol; all payloads are byte sequences with a trailing checksum (CKS = low byte of the sum of all preceding bytes). See Transport framing notes for the worked example from the source.
- Every command shares a common response structure: success ACK/NAK with optional data, or error NAK carrying ERR1/ERR2. See the Feedbacks section for the full error-code table.
- The source manual is a generic "Projector Control Command Reference Manual" (BDT140013 Rev 7.1); it is not PN-HE751-specific. Several command value tables (input terminal codes, aspect values, eco-mode values, base model types, sub-input values) reference an Appendix "Supplementary Information by Command" that is **not present in this refined source excerpt**.

<!-- UNRESOLVED: model name "PN-HE751" supplied by operator; not verifiable from this generic projector manual. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: flow_control not explicitly specified (only "Full duplex" communication mode stated). -->
<!-- UNRESOLVED: Appendix 'Supplementary Information by Command' (input terminal, aspect, eco mode, sub-input, base model type codes) not present in this source excerpt. -->
<!-- UNRESOLVED: other LENS CONTROL DATA01 target codes besides 06h (Periphery Focus) not enumerated in this excerpt. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:57:31.223Z
last_checked_at: 2026-06-18T09:07:06.787Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:07:06.787Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device model name \"PN-HE751\" supplied by operator; source manual is a generic \"Projector Control Command Reference\" with no model-specific cover page. Confirm model match."
- "firmware version compatibility not stated in source."
- "source states \"Full duplex\" communication mode; RTS/CTS pins are wired in the D-SUB 9P pinout but no explicit hardware flow-control procedure is described. Treated as none."
- "other DATA01 target codes not enumerated in this source excerpt.\""
- "eco-mode, aspect, input-terminal, sub-input, base-model-type code"
- "source describes no unsolicited notifications / push events."
- "source documents no explicit multi-step command sequences."
- "no explicit power-on sequencing procedure documented in this source excerpt."
- "model name \"PN-HE751\" supplied by operator; not verifiable from this generic projector manual."
- "flow_control not explicitly specified (only \"Full duplex\" communication mode stated)."
- "Appendix 'Supplementary Information by Command' (input terminal, aspect, eco mode, sub-input, base model type codes) not present in this source excerpt."
- "other LENS CONTROL DATA01 target codes besides 06h (Periphery Focus) not enumerated in this excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
