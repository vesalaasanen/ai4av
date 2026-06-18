---
spec_id: admin/sharp-nec-led-e012i-108in
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED E012I 108in Control Spec"
manufacturer: Sharp/NEC
model_family: "Sharp/NEC LED E012I 108In"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Sharp/NEC LED E012I 108In"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:00:08.815Z
last_checked_at: 2026-06-17T20:10:06.148Z
generated_at: 2026-06-17T20:10:06.148Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value list lives in referenced \"Appendix / Supplementary Information by Command\" not included in this source extract. Several commands reference it (018, 030-12, 097/098-198, 319-10)."
  - "source states \"Full duplex\" communication mode; flow control not specified"
  - "appendix not in source extract."
  - "source provides bit-field layouts for query responses but not a"
  - "input terminal value map (commands 018, 319-10) — appendix not in extract"
  - "aspect value map (command 030-12) — appendix not in extract"
  - "PIP/PbP sub-input value map (097/098-198) — appendix not in extract"
  - "eco mode value map (097-8 / 098-8) — appendix not in extract"
  - "base model type code map (078-1, 305-1) — appendix not in extract"
  - "ID1 (control ID) and ID2 (model code) default/runtime values not in source"
  - "firmware version compatibility not stated"
  - "serial flow control unspecified (only \"full duplex\" stated)"
verification:
  verdict: verified
  checked_at: 2026-06-17T20:10:06.148Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched exactly with source command opcodes; transport (baud 115200, port 7142) verified; full bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED E012I 108in Control Spec

## Summary
Sharp/NEC LED E012I 108in projector (manual BDT140013 Rev 7.1). Binary control over both RS-232C serial and TCP LAN (port 7142). 53 commands: power, mute, picture/volume/aspect adjust, input switch, lens control + memory, info/status queries, edge blending, PIP/PbP, audio select, eco mode, freeze, shutter.

<!-- UNRESOLVED: input terminal value list lives in referenced "Appendix / Supplementary Information by Command" not included in this source extract. Several commands reference it (018, 030-12, 097/098-198, 319-10). -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source: 115200/38400/19200/9600/4800 bps all supported
  supported_baud_rates: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode; flow control not specified
  communication_mode: full_duplex
addressing:
  port: 7142  # source: "Use TCP port number 7142 for sending and receiving commands"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: POWER ON (015) / POWER OFF (016)
  - routable       # inferred: INPUT SW CHANGE (018) / audio select (319-10)
  - queryable      # inferred: many status request commands present
  - levelable      # inferred: PICTURE ADJUST (030-1) / VOLUME ADJUST (030-2) / OTHER ADJUST (030-15)
```

## Actions
```yaml
# Binary protocol. Frame layout (per source §2.1):
#   [Op1] [Op2] [ID1] [ID2] [LEN] [DATA...] [CKS]
# ID1 = control ID set on projector. ID2 = model code. CKS = low byte of sum of
# all preceding bytes. Fixed bytes shown verbatim; DATA placeholders shown as
# {DATAxx}. Each action's `command:` carries the literal opcode payload from
# source; parameter DATA bytes documented in `params`.
#
# Source does NOT publish the projector's ID1 / ID2 values - they are runtime
# config per device. CKS is computed at runtime from the full frame.

- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: While power-on in progress, no other command accepted.

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: No other command accepted during power-off (incl. cooling time).

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal selector. Example 06h = Video port. Full value list in source Appendix ("Supplementary Information by Command") - UNRESOLVED: appendix not in source extract.
  notes: Response DATA01 FFh = ended with error (no signal switch made).

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: Cleared on input/video signal switch.

- id: picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: Cleared on input/video switch or volume adjust.

- id: sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: Cleared on input/video signal switch.

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Aspect value. Full value list in source Appendix - UNRESOLVED: appendix not in source extract.

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: documented only 96h=LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: integer
      description: "Sub-target - source shows 96h/FFh pairing only; other pairings UNRESOLVED"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Response DATA01-49=projector name; DATA83-86=lamp usage sec; DATA87-90=filter usage sec.

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Response DATA01-04=filter usage sec; DATA05-08=filter alarm start sec (-1 if undefined).

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (lamp 2 only valid on two-lamp models)"
    - name: DATA02
      type: integer
      description: "Content: 01h=usage time (sec), 04h=remaining life (%)"
  notes: Negative remaining life % returned if lamp deadline exceeded.

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD). See source key code list."
    - name: DATA02
      type: integer
      description: "Key code high byte (WORD). Per source table, DATA02 = 00h for all listed keys."
  notes: "Key code list (key|DATA01|DATA02|name): 2|02h|00h|POWER ON, 3|03h|00h|POWER OFF, 5|05h|00h|AUTO, 6|06h|00h|MENU, 7|07h|00h|UP, 8|08h|00h|DOWN, 9|09h|00h|RIGHT, 10|0Ah|00h|LEFT, 11|0Bh|00h|ENTER, 12|0Ch|00h|EXIT, 13|0Dh|00h|HELP, 15|0Fh|00h|MAGNIFY UP, 16|10h|00h|MAGNIFY DOWN, 19|13h|00h|MUTE, 41|29h|00h|PICTURE, 75|4Bh|00h|COMPUTER1, 76|4Ch|00h|COMPUTER2, 79|4Fh|00h|VIDEO1, 81|51h|00h|S-VIDEO1, 132|84h|00h|VOLUME UP, 133|85h|00h|VOLUME DOWN, 138|8Ah|00h|FREEZE, 163|A3h|00h|ASPECT, 215|D7h|00h|SOURCE, 238|EEh|00h|LAMP MODE/ECO"

- id: shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens function - source lists only 06h=Periphery Focus"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: While lens driving, can re-issue same command to continue without stop.

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens function selector (same as 053 DATA01)
  notes: Response returns DATA02-07 = upper/lower/current value range.

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens function (FFh = Stop; if Stop, DATA02-04 ignored)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: Operates on profile number set via 053-10 LENS PROFILE SET.

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: Response DATA02 returns 00h=OFF or 01h=ON.

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Response DATA01 bitmap: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) - each 0=Stop/1=During operation.

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST / LIGHT ADJUST"

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Response DATA01-03=base model type, DATA04=sound function, DATA05=profile number / clock function.

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Response DATA03=power status, DATA04=cooling process, DATA05=power on/off process, DATA06=operation status.

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: Response DATA01 00h=Normal (cover open), 01h=Cover closed.

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze ON, 02h=freeze OFF"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Returns Light mode or Lamp mode depending on projector.

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_pbp_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Eco mode value - full enum in source Appendix, UNRESOLVED in extract.

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_pbp_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Value varies by DATA01 - MODE: 00h=PIP/01h=PbP. START POSITION: 00h=TOP-LEFT..03h=BOTTOM-RIGHT. Sub-input list UNRESOLVED in extract."

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: Response: DATA01=operation status, DATA02=content displayed, DATA03-05=signal types, DATA06-09=mute/freeze status.

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal value - full list in source Appendix, UNRESOLVED in extract.
    - name: DATA02
      type: integer
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# All query actions (kind: query) return data frames described in source §3.
# Response framing:
#   - success no-data: 2xh {Op2} {ID1} {ID2} 00h {CKS}
#   - success +data:   2xh {Op2} {ID1} {ID2} {LEN} {DATA...} {CKS}
#   - failure:         Axh {Op2} {ID1} {ID2} 02h {ERR1} {ERR2} {CKS}
# Error code pairs ERR1/ERR2 enumerated in source §2.4 (00h00h=unrecognized,
# 00h01h=unsupported by model, 01h00h=invalid value, 02h0Dh=power off, etc.).

# UNRESOLVED: source provides bit-field layouts for query responses but not a
# normalized enum-mapped feedback list. Specific response shapes documented in
# each Action's `notes` above. Per-source normalized feedback entries deferred.
```

## Variables
```yaml
# Settable parameters (picture, volume, lamp/light adjust, aspect, lens
# positions) are modeled as parameterized Actions above (030-1, 030-2, 030-15,
# 053, 053-2, etc.) with DATA params. No separate Variables entries emitted -
# source does not separate "variables" from "actions".
```

## Events
```yaml
# Source describes no unsolicited notifications - projector only replies to
# commands. No Events entries.
```

## Macros
```yaml
# Source describes no explicit multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes power-on / power-off periods where no other command is accepted
# (015 / 016) and an interlock-switch bit in ERROR STATUS (DATA09 Bit1).
# No explicit confirmation-gated procedure or sequencing warning beyond this.
```

## Notes
- Manual ID: BDT140013 Revision 7.1.
- Commands are binary hex frames. Checksum = low byte of sum of all preceding bytes (per §2.2, worked example given).
- ID1 (control ID) and ID2 (model code) are per-device runtime config — source does not publish literal values.
- The fixed command bytes in `command:` fields exclude ID1/ID2/CKS where the source itself omits them in the "Command" line (source shows command bytes verbatim, then the response echoes ID1/ID2). For commands where the source's "Command" line carries no ID1/ID2/CKS, the literal shown is what the source printed.
- Several commands reference an "Appendix: Supplementary Information by Command" for input terminal lists, aspect values, sub-input values, eco mode values, and base model types. This appendix is NOT in the refined source extract.
- LAN: wired 10/100 auto-negotiating, wireless via separate LAN unit (per its own manual).

<!-- UNRESOLVED: input terminal value map (commands 018, 319-10) — appendix not in extract -->
<!-- UNRESOLVED: aspect value map (command 030-12) — appendix not in extract -->
<!-- UNRESOLVED: PIP/PbP sub-input value map (097/098-198) — appendix not in extract -->
<!-- UNRESOLVED: eco mode value map (097-8 / 098-8) — appendix not in extract -->
<!-- UNRESOLVED: base model type code map (078-1, 305-1) — appendix not in extract -->
<!-- UNRESOLVED: ID1 (control ID) and ID2 (model code) default/runtime values not in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: serial flow control unspecified (only "full duplex" stated) -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:00:08.815Z
last_checked_at: 2026-06-17T20:10:06.148Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:10:06.148Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched exactly with source command opcodes; transport (baud 115200, port 7142) verified; full bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value list lives in referenced \"Appendix / Supplementary Information by Command\" not included in this source extract. Several commands reference it (018, 030-12, 097/098-198, 319-10)."
- "source states \"Full duplex\" communication mode; flow control not specified"
- "appendix not in source extract."
- "source provides bit-field layouts for query responses but not a"
- "input terminal value map (commands 018, 319-10) — appendix not in extract"
- "aspect value map (command 030-12) — appendix not in extract"
- "PIP/PbP sub-input value map (097/098-198) — appendix not in extract"
- "eco mode value map (097-8 / 098-8) — appendix not in extract"
- "base model type code map (078-1, 305-1) — appendix not in extract"
- "ID1 (control ID) and ID2 (model code) default/runtime values not in source"
- "firmware version compatibility not stated"
- "serial flow control unspecified (only \"full duplex\" stated)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
