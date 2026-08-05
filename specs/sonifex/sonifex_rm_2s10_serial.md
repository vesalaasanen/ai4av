---
spec_id: admin/sonifex-rm-2s10
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sonifex RM-2S10 Control Spec"
manufacturer: Sonifex
model_family: RM-2S10
aliases: []
compatible_with:
  manufacturers:
    - Sonifex
  models:
    - RM-2S10
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sonifex.co.uk
source_urls:
  - https://sonifex.co.uk/wp-content/uploads/products/RM-2S10/reference_monitor_hb.pdf
  - https://sonifex.co.uk/product/rm-2s10/
retrieved_at: 2026-07-01T14:29:36.229Z
last_checked_at: 2026-08-05T08:44:15.066Z
generated_at: 2026-08-05T08:44:15.066Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device-level power/voltage/current ratings; GPIO output rating (50mA/30V) noted in source but not standardised for spec"
  - "no higher-level typed \"set EQ frequency / gain / BW\" variable exposed; values"
  - "source describes no unsolicited events beyond the power-up welcome string and"
  - "no multi-step macro sequences explicitly documented in source."
  - "source recommends SCi; for direct DWN:* user must ensure uninterrupted connection or unit enters protected Bootloader mode"
  - "GPIO alarms exist (audio underlevel, audio overlevel, sustained phase error) but"
  - "GPIO electrical limit exact value is 50mA / 30V open-collector; treat as warning only, do not re-expose as control value."
  - "no power-on/power-off commands documented in this serial protocol; rely on front panel or mains."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:44:15.066Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions map to wire-literal tokens in the source command table; transport params verbatim; SDI EXT A/B banks represented via BSL:nn with RM-HD1 table. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Sonifex RM-2S10 Control Spec

## Summary
RS-232/USB serial remote control for the Sonifex RM-2S10 Reference Monitor (10 AES input stereo unit). Uses ASCII command protocol at 19200,8,E,1 with XON/XOFF flow control; USB interface presents as virtual serial port with identical protocol. Optional RM-HD1 SDI expansion card adds EXT A/B banks for SDI de-embedded audio.

<!-- UNRESOLVED: device-level power/voltage/current ratings; GPIO output rating (50mA/30V) noted in source but not standardised for spec -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: even
  stop_bits: 1
  flow_control: xon_xoff
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: SRQ, LCK, UID, VER, SER queries present
- routable   # inferred: BSL bank selection, SS1/SS2 source selection commands
```

## Actions
```yaml
# CRITICAL - payload rule: every command copied verbatim from source.
# No power on/off commands documented for RM-2S10 in this protocol.

- id: select_bank
  label: Select Input Bank
  kind: action
  command: "BSL:nn"  # nn = 01 selects first bank, 02 selects second bank, etc
  params:
    - name: nn
      type: hex_string
      description: Bank number (01..n)

- id: download_firmware
  label: Download Firmware Update
  kind: action
  command: "DWN:*"
  params: []
  notes: Then send .DWN file as supplied. Valid in bootloader mode.

- id: set_eq_coefficients
  label: Set User-Variable EQ Coefficients
  kind: action
  command: "Faa:xxxxxxxxxxxxyyyyyyyyyyyyzzzzzzzzzzzz"  # aa=01-05, x/y/z = 5-byte hex coefficient strings MSB-first
  params:
    - name: aa
      type: hex_string
      description: EQ band number (01-05)
    - name: coefficient1
      type: hex_string
      description: 5-byte coefficient 1 (MSB first, upper nibble of MSB = 0)
    - name: coefficient2
      type: hex_string
      description: 5-byte coefficient 2 (MSB first)
    - name: coefficient3
      type: hex_string
      description: 5-byte coefficient 3 (MSB first)

- id: front_panel_lock
  label: Front Panel Lock
  kind: action
  command: "FPL:x"  # x=0 unlock; x=1 (or 1-F hex) lock. Not retained across power loss.
  params:
    - name: x
      type: hex_string
      description: 0 = unlock, 1..F = lock

- id: get_eq_coefficients
  label: Get User-Variable EQ Coefficients
  kind: query
  command: "Gaa:"  # aa = EQ band number (01-05)
  params:
    - name: aa
      type: hex_string
      description: EQ band number (01-05)

- id: aes_pll_lock_status
  label: AES/EBU PLL Lock Status Request
  kind: query
  command: "LCK:"  # RM-2S10 response: LCK:x+yyyyyyyyyy - x=lock of selected stereo source, y=lock of all 10 AES inputs
  params: []

- id: set_modifier_dim
  label: Audio Modifier - DIM
  kind: action
  command: "MOD:0,y"  # y=0 off, y=1 (or 1-F hex) on
  params:
    - name: y
      type: hex_string
      description: 0 = off, 1..F = on

- id: set_modifier_cut_l
  label: Audio Modifier - CUT L
  kind: action
  command: "MOD:1,y"  # y=0 off, y=1 (or 1-F hex) on
  params:
    - name: y
      type: hex_string
      description: 0 = off, 1..F = on

- id: set_modifier_cut_r
  label: Audio Modifier - CUT R
  kind: action
  command: "MOD:2,y"  # y=0 off, y=1 (or 1-F hex) on
  params:
    - name: y
      type: hex_string
      description: 0 = off, 1..F = on

- id: set_modifier_mono
  label: Audio Modifier - MONO
  kind: action
  command: "MOD:5,y"  # y=0 off, y=1 (or 1-F hex) on
  params:
    - name: y
      type: hex_string
      description: 0 = off, 1..F = on

- id: set_modifier_phase_invert
  label: Audio Modifier - PHASE INVERT
  kind: action
  command: "MOD:6,y"  # y=0 off, y=1 (or 1-F hex) on
  params:
    - name: y
      type: hex_string
      description: 0 = off, 1..F = on

- id: set_modifier_m_plus_s
  label: Audio Modifier - M+S
  kind: action
  command: "MOD:7,y"  # y=0 off, y=1 (or 1-F hex) on
  params:
    - name: y
      type: hex_string
      description: 0 = off, 1..F = on

- id: set_technical_option
  label: Set Technical Options
  kind: action
  command: "OPT:x,yy"  # x = 1..F option number, yy = new value 00..FF. Stored in non-volatile memory.
  params:
    - name: x
      type: hex_string
      description: Option number (1..F)
    - name: yy
      type: hex_string
      description: New option value (00..FF)

- id: opt_1_presence_detection
  label: OPT:1 - Presence Detection (RM-2S10)
  kind: action
  command: "OPT:1,xx"  # x=00 enable presence detectors (default); x=01..FF disable
  params:
    - name: xx
      type: hex_string
      description: 00 = presence detectors enabled (default); 01..FF = disabled

- id: opt_2_source_autodetect
  label: OPT:2 - Source Autodetection (RM-2S10)
  kind: action
  command: "OPT:2,xx"  # x=00 normal operation (default); x=01..FF enable source autoselection. UID reports single bank of 10 sources when autoselect on.
  params:
    - name: xx
      type: hex_string
      description: 00 = normal (default); 01..FF = source autoselection

- id: opt_3_gpio_lock_polarity
  label: OPT:3 - GPIO Lock Output Logic
  kind: action
  command: "OPT:3,ab"  # a=0 normal polarity (lock=low/conducting), a=1 inverted (lock=high/non-conducting); b=0 OR of LH/RH lock, b=1 AND of LH/RH lock
  params:
    - name: a
      type: hex_string
      description: 0 = normal polarity, 1 = inverted polarity
    - name: b
      type: hex_string
      description: 0 = LH/RH OR, 1 = LH/RH AND

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "SER:"
  params: []

- id: status_request
  label: Status Request
  kind: query
  command: "SRQ:"  # Returns SRQ:BxLyRz - x=bank, y=LH source, z=RH source
  params: []

- id: set_left_source
  label: Set Left-Hand Source
  kind: action
  command: "SS1:nn"  # nn = source number starting with 01
  params:
    - name: nn
      type: hex_string
      description: Source number (starts at 01)

- id: set_right_source
  label: Set Right-Hand Source
  kind: action
  command: "SS2:nn"  # nn = source number starting with 01
  params:
    - name: nn
      type: hex_string
      description: Source number (starts at 01)

- id: unit_id_request
  label: Unit ID Request
  kind: query
  command: "UID:*"  # Returns UID:RM-2S10-xxxxxx; valid in bootloader mode
  params: []

- id: firmware_version_request
  label: Firmware Version Request
  kind: query
  command: "VER:*"  # Returns VER:n.nn or BOOT:n.nn (bootloader). Valid in bootloader mode.
  params: []

- id: select_sdi_bank_ext_a
  label: Select SDI Bank EXT A (RM-HD1)
  kind: action
  command: "BSL:"  # Selects bank mapping to EXT A (SDI groups 1 & 2 on RM-2S10 with RM-HD1)
  params: []
  notes: Bank label "EXT A" is provided to the unit via SCi/config; serial protocol uses numeric bank index via BSL:nn.

- id: select_sdi_bank_ext_b
  label: Select SDI Bank EXT B (RM-HD1)
  kind: action
  command: "BSL:"  # Selects bank mapping to EXT B (SDI groups 3 & 4 on RM-2S10 with RM-HD1)
  params: []
  notes: Bank label "EXT B" is provided to the unit via SCi/config; serial protocol uses numeric bank index via BSL:nn.
```

## Feedbacks
```yaml
- id: ack
  type: string
  description: Generic acknowledgement returned for all set commands - literal "ACK:"
- id: err_command_not_found
  type: string
  description: "ERR:01 - Command Not Found"
- id: err_missing_parameter
  type: string
  description: "ERR:02 - Missing Parameter"
- id: err_parameter_out_of_range
  type: string
  description: "ERR:04 - Parameter out of range"
- id: err_checksum
  type: string
  description: "ERR:08 - Checksum Error during reprogramming"
- id: lck_response_rm_2s10
  type: string
  description: "LCK:x+yyyyyyyyyy - x = lock status of selected stereo source, yyyyyyyyyy = lock status of all ten AES inputs"
- id: welcome_string
  type: string
  description: 'Power-up banner: "Initialising Sonifex Reference Monitor…done"'
```

## Variables
```yaml
# User-variable EQ coefficients - set via Faa: / retrieved via Gaa:
# 5 bands (01-05), each band = 3 coefficients of 5 hex bytes MSB-first (S3.24 format)
# Settable per band as a triple of parametric EQ coefficients (F centre Hz, BW octaves, G linear gain/peak).
# No discrete variable entry - coefficients passed as raw hex strings per Actions.
# UNRESOLVED: no higher-level typed "set EQ frequency / gain / BW" variable exposed; values
# must be pre-computed per the boost/cut formulas in the source (R, K, A, M1, M2, M3).
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited events beyond the power-up welcome string and
# per-request ACK/ERR responses. No notification push model documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences explicitly documented in source.
# BSL: / SS1: / SS2: sequences for SDI audio selection are user-assembled.
```

## Safety
```yaml
confirmation_required_for:
  - download_firmware  # UNRESOLVED: source recommends SCi; for direct DWN:* user must ensure uninterrupted connection or unit enters protected Bootloader mode
interlocks: []
# UNRESOLVED: GPIO alarms exist (audio underlevel, audio overlevel, sustained phase error) but
# alarm behaviour over the serial protocol is not separately commanded here - physical inputs
# only (Alarm Reset, MUTE, DIM, Speaker Mute on 15-way D-type).
# GPIO outputs rated 50mA / 30V per source; DO NOT exceed.
# Do not interrupt serial connection or mains power during firmware update.
# DIP SW12 Block 1 = ON forces Bootloader; restore to OFF after recovery update.
```

## Notes
- Protocol is shared across RM-2S4, RM-2S10, RM-4C8 hosts; some responses (LCK format, UID string) vary by model. Documented above is RM-2S10 behaviour.
- All commands are case-insensitive; all parameters in hex.
- Commands terminated with CR (LF ignored if sent). Responses CR+LF terminated.
- After power up, welcome string "Initialising Sonifex Reference Monitor…done" is sent.
- Further commands sent before the first command is ACKed are ignored.
- USB port presents as a virtual serial port with identical data format (19200,8,E,1) and command protocol.
- OPT settings are non-volatile; FPL (front panel lock) is NOT retained across power loss.
- For firmware update via terminal program, set Line Delay to ~20ms.
- RM-HD1 expansion: EXT A = SDI groups 1 & 2, EXT B = SDI groups 3 & 4; channel pair mapping per source table.
- RM-HD1 audio delay: ~297.9 ms max; controlled via SCi or by holding DIM button ~2 s; must be enabled in SCi system screen first.
<!-- UNRESOLVED: GPIO electrical limit exact value is 50mA / 30V open-collector; treat as warning only, do not re-expose as control value. -->
<!-- UNRESOLVED: no power-on/power-off commands documented in this serial protocol; rely on front panel or mains. -->

## Provenance

```yaml
source_domains:
  - sonifex.co.uk
source_urls:
  - https://sonifex.co.uk/wp-content/uploads/products/RM-2S10/reference_monitor_hb.pdf
  - https://sonifex.co.uk/product/rm-2s10/
retrieved_at: 2026-07-01T14:29:36.229Z
last_checked_at: 2026-08-05T08:44:15.066Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:44:15.066Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions map to wire-literal tokens in the source command table; transport params verbatim; SDI EXT A/B banks represented via BSL:nn with RM-HD1 table. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device-level power/voltage/current ratings; GPIO output rating (50mA/30V) noted in source but not standardised for spec"
- "no higher-level typed \"set EQ frequency / gain / BW\" variable exposed; values"
- "source describes no unsolicited events beyond the power-up welcome string and"
- "no multi-step macro sequences explicitly documented in source."
- "source recommends SCi; for direct DWN:* user must ensure uninterrupted connection or unit enters protected Bootloader mode"
- "GPIO alarms exist (audio underlevel, audio overlevel, sustained phase error) but"
- "GPIO electrical limit exact value is 50mA / 30V open-collector; treat as warning only, do not re-expose as control value."
- "no power-on/power-off commands documented in this serial protocol; rely on front panel or mains."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
