---
spec_id: admin/hisense-5u88km
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 5U88KM Control Spec"
manufacturer: HiSense
model_family: 5U88KM
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 5U88KM
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-06-02T21:41:56.217Z
generated_at: 2026-06-02T21:41:56.217Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - SPKM
  - B2BM
  - USBM
  - PSHF
  - "model \"5U88KM\" is not named in the source document; source is the generic HiSense Prosumer TV RS-232 protocol. User-supplied hint of \"TCP/IP\" is not supported by the source — source is RS-232 only. IR section of source is not represented as Actions (out of scope for machine protocol). POIS0000..POIS0003 visible; remainder of the POIS row list was truncated at end of source."
  - "source does not document any unsolicited event/notification scheme."
  - "source does not document any multi-step sequences as named macros."
  - "source has no explicit safety warnings or confirmation requirements."
  - "source describes configuration preconditions for RS-232 (Custom Install"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:56.217Z
  matched_actions: 112
  action_count: 112
  confidence: medium
  summary: "All 112 spec actions matched verbatim in source RS-232 command table with correct shapes and transport; 4 extra source command families (SPKM, B2BM, USBM, PSHF) not in spec but count is <=5 so short threshold is not triggered; coverage ratio 38/42=0.905 meets the 0.9 floor. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# HiSense 5U88KM Control Spec

## Summary
RS-232 control protocol for the HiSense 5U88KM Prosumer TV. Source document covers the HiSense Prosumer TV product line and exposes ASCII command set over a DB9 serial interface at 9600 8N1, with both set/query semantics and a fixed-length framed protocol (operation + client ID + command + data + checksum + CR). The 5U88KM model is not named in the source; this spec is built from the generic Prosumer TV protocol document and is offered as a best-effort draft for verification.

<!-- UNRESOLVED: model "5U88KM" is not named in the source document; source is the generic HiSense Prosumer TV RS-232 protocol. User-supplied hint of "TCP/IP" is not supported by the source — source is RS-232 only. IR section of source is not represented as Actions (out of scope for machine protocol). POIS0000..POIS0003 visible; remainder of the POIS row list was truncated at end of source. -->

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
  communication_code: ascii
  connector: DB9 female (D-sub 9-pin) on TV chassis
  electrical: RS-232C compliant
auth:
  type: none  # inferred: no auth procedure in source
frame:
  # Fixed-length message. Each unit = 1 byte. Termination is CR (0x0D).
  # Set:   [OPERATION 1B][CLIENT_ID 3B][COMMAND 4B][DATA 4B][CHECKSUM 1B][CR 1B] = 14B
  # Query: [OPERATION 1B][CLIENT_ID 3B][COMMAND 4B][????    4B][CHECKSUM 1B][CR 1B] = 14B
  # Ack:   [CLIENT_ID 3B][: 1B][ACK 4B][DATA 4B][CHECKSUM 1B][CR 1B] = 14B
  operation: "S=Set, Q=Query"
  client_id: "0-9,A-F; Smart TV uses last 3 bytes of Ethernet MAC; Feature TV uses TV-menu value; 'ALL' = broadcast"
  command: "A-Z, 4 bytes"
  data: "0-9,A-Z,#,?  (4 bytes; ???? for query)"
  checksum_formula: "checksum = (0x100 - (sum_of_preceding_12_bytes mod 0x100)) mod 0x100  # sum of OPERATION..DATA inclusive"
  termination: "0x0D (Carriage Return)"
  case_sensitive: true
```

## Traits
```yaml
- powerable       # inferred: POWR set commands present
- routable        # inferred: INPT set commands present
- queryable       # inferred: all command families have ???? query form
- levelable       # inferred: VOLM, BRIT, CONT, COLR, TINT, SHRP, BKLV level-set commands present
```

## Actions
```yaml
# Frame template:  S{client_id}{CMD}{DATA}{checksum}\r   for set
#                  Q{client_id}{CMD}???{checksum}\r     for query
# {client_id} = 3 bytes ("ALL" for broadcast, or last 3 of MAC for addressed)
# {checksum}  = 1 byte per checksum_formula above
# Use SOURCE HEX examples (e.g. "53 41 4C 4C 50 4F 57 52 30 30 30 31 CB 0D" = POWR0001 with client_id=ALL) to verify checksum.

# ---- Power ----
- id: pwre_disable
  label: Disable RS-232 Remote Power On
  kind: action
  command: "S{client_id}PWRE0000{checksum}\r"
  notes: "GENERIC HEX (client_id=ALL): 53 41 4C 4C 50 57 52 45 30 30 30 30 D6 0D"
  params: []

- id: pwre_enable
  label: Enable RS-232 Remote Power On
  kind: action
  command: "S{client_id}PWRE0001{checksum}\r"
  notes: "GENERIC HEX (client_id=ALL): 53 41 4C 4C 50 57 52 45 30 30 30 31 D5 0D"
  params: []

- id: pwre_query
  label: Query Power-On-Command Enable Setting
  kind: query
  command: "Q{client_id}PWRE????{checksum}\r"
  notes: "Returns 0=disabled, 1=enabled"
  params: []

- id: powr_standby
  label: Power Standby
  kind: action
  command: "S{client_id}POWR0000{checksum}\r"
  notes: "GENERIC HEX (client_id=ALL): 53 41 4C 4C 50 4F 57 52 30 30 30 30 CC 0D"
  params: []

- id: powr_on
  label: Power On
  kind: action
  command: "S{client_id}POWR0001{checksum}\r"
  notes: "GENERIC HEX (client_id=ALL): 53 41 4C 4C 50 4F 57 52 30 30 30 31 CB 0D"
  params: []

# ---- Input Source ----
- id: inpt_set
  label: Set Input Source
  kind: action
  command: "S{client_id}INPT{data}{checksum}\r"
  params:
    - name: data
      type: enum
      description: Input code
      values: ["0000", "0001", "0003", "0004", "0006", "0009", "0010", "0011", "0012"]
      value_meanings:
        "0000": "Change Input Signal One at a Time (next input)"
        "0001": "TV Tuner"
        "0003": "Component"
        "0004": "AV"
        "0006": "VGA"
        "0009": "HDMI1"
        "0010": "HDMI2"
        "0011": "HDMI3"
        "0012": "HDMI4"

- id: inpt_query
  label: Query Current Input Source
  kind: query
  command: "Q{client_id}INPT????{checksum}\r"
  notes: "Returns 1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4"
  params: []

# ---- Picture Mode ----
- id: pmod_set
  label: Set Picture Mode
  kind: action
  command: "S{client_id}PMOD{data}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0002", "0003", "0004", "0005", "0006"]
      value_meanings:
        "0000": "Standard"
        "0002": "Vivid"
        "0003": "EnergySaving"
        "0004": "Theater"
        "0005": "Game"
        "0006": "Sport"

- id: pmod_query
  label: Query Picture Mode
  kind: query
  command: "Q{client_id}PMOD????{checksum}\r"
  params: []

# ---- Picture Levels (set 4-digit value, query returns 0-100 or 0-20 for SHRP) ----
- id: brit_set
  label: Set Brightness
  kind: action
  command: "S{client_id}BRIT{data}{checksum}\r"
  params:
    - name: data
      type: integer
      description: "Brightness 0-100, encoded as 4-digit zero-padded decimal (e.g. 0050)"

- id: brit_query
  label: Query Brightness
  kind: query
  command: "Q{client_id}BRIT????{checksum}\r"
  notes: "Returns 0-100"
  params: []

- id: cont_set
  label: Set Contrast
  kind: action
  command: "S{client_id}CONT{data}{checksum}\r"
  params:
    - name: data
      type: integer
      description: "Contrast 0-100, encoded as 4-digit zero-padded decimal (e.g. 0050)"

- id: cont_query
  label: Query Contrast
  kind: query
  command: "Q{client_id}CONT????{checksum}\r"
  notes: "Returns 0-100"
  params: []

- id: colr_set
  label: Set Color Saturation
  kind: action
  command: "S{client_id}COLR{data}{checksum}\r"
  params:
    - name: data
      type: integer
      description: "Color Saturation 0-100, encoded as 4-digit zero-padded decimal"

- id: colr_query
  label: Query Color Saturation
  kind: query
  command: "Q{client_id}COLR????{checksum}\r"
  notes: "Returns 0-100"
  params: []

- id: tint_set
  label: Set Tint
  kind: action
  command: "S{client_id}TINT{data}{checksum}\r"
  params:
    - name: data
      type: integer
      description: "Tint 0-100, encoded as 4-digit zero-padded decimal"

- id: tint_query
  label: Query Tint
  kind: query
  command: "Q{client_id}TINT????{checksum}\r"
  notes: "Returns 0-100"
  params: []

- id: shrp_set
  label: Set Sharpness
  kind: action
  command: "S{client_id}SHRP{data}{checksum}\r"
  params:
    - name: data
      type: integer
      description: "Sharpness 0-20, encoded as 4-digit zero-padded decimal"

- id: shrp_query
  label: Query Sharpness
  kind: query
  command: "Q{client_id}SHRP????{checksum}\r"
  notes: "Returns 0-20"
  params: []

# ---- Aspect Ratio ----
- id: aspt_set
  label: Set Aspect Ratio
  kind: action
  command: "S{client_id}ASPT{data}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0002", "0003", "0004", "0005", "0006", "0007", "0008"]
      value_meanings:
        "0000": "Auto"
        "0002": "Normal"
        "0003": "Zoom"
        "0004": "Wide"
        "0005": "Direct"
        "0006": "1-to-1 pixel map"
        "0007": "Panoramic"
        "0008": "Cinema"

- id: aspt_query
  label: Query Aspect Ratio
  kind: query
  command: "Q{client_id}ASPT????{checksum}\r"
  params: []

# ---- Overscan ----
- id: ovsn_set
  label: Set Overscan
  kind: action
  command: "S{client_id}OVSN{data}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0002"]
      value_meanings: { "0000": "On", "0002": "Off" }

- id: ovsn_query
  label: Query Overscan
  kind: query
  command: "Q{client_id}OVSN????{checksum}\r"
  params: []

- id: rstp1000
  label: Reset Picture Settings
  kind: action
  command: "S{client_id}RSTP1000{checksum}\r"
  notes: "GENERIC HEX (client_id=ALL): 53 41 4C 4C 52 53 54 50 31 30 30 30 CA 0D"
  params: []

# ---- Color Temp ----
- id: ctem_set
  label: Set Color Temperature
  kind: action
  command: "S{client_id}CTEM{data}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0002", "0003", "0004"]
      value_meanings:
        "0000": "High"
        "0002": "Middle"
        "0003": "Mid-Low"
        "0004": "Low"

- id: ctem_query
  label: Query Color Temperature
  kind: query
  command: "Q{client_id}CTEM????{checksum}\r"
  params: []

# ---- Backlight ----
- id: bklv_set
  label: Set Backlight
  kind: action
  command: "S{client_id}BKLV{data}{checksum}\r"
  params:
    - name: data
      type: integer
      description: "Backlight 0-100, encoded as 4-digit zero-padded decimal"

- id: bklv_query
  label: Query Backlight
  kind: query
  command: "Q{client_id}BKLV????{checksum}\r"
  notes: "Returns 0-100"
  params: []

# ---- Sound Mode ----
- id: amod_set
  label: Set Sound Mode
  kind: action
  command: "S{client_id}AMOD{data}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0002", "0003", "0004", "0005"]
      value_meanings:
        "0000": "Standard"
        "0002": "Theater"
        "0003": "Music"
        "0004": "Speech"
        "0005": "Late night"

- id: amod_query
  label: Query Sound Mode
  kind: query
  command: "Q{client_id}AMOD????{checksum}\r"
  params: []

- id: rsta2000
  label: Reset Audio Settings
  kind: action
  command: "S{client_id}RSTA2000{checksum}\r"
  notes: "GENERIC HEX (client_id=ALL): 53 41 4C 4C 52 53 54 41 32 30 30 30 D8 0D"
  params: []

# ---- Volume ----
- id: volm_set
  label: Set Volume
  kind: action
  command: "S{client_id}VOLM{data}{checksum}\r"
  params:
    - name: data
      type: integer
      description: "Volume 0-100, encoded as 4-digit zero-padded decimal"

- id: volm_query
  label: Query Volume
  kind: query
  command: "Q{client_id}VOLM????{checksum}\r"
  notes: "Returns 0-100"
  params: []

# ---- Mute ----
- id: mute_set
  label: Set Mute
  kind: action
  command: "S{client_id}MUTE{data}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001"]
      value_meanings: { "0000": "Off", "0001": "On" }

- id: mute_query
  label: Query Mute Status
  kind: query
  command: "Q{client_id}MUTE????{checksum}\r"
  notes: "Returns 0=not mute, 1=mute"
  params: []

# ---- TV Speaker ----
- id: aspk_set
  label: Set TV Speaker
  kind: action
  command: "S{client_id}ASPK{data}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0002"]
      value_meanings: { "0000": "Off", "0002": "On" }

- id: aspk_query
  label: Query TV Speaker
  kind: query
  command: "Q{client_id}ASPK????{checksum}\r"
  params: []

# ---- Tuner ----
- id: tunr_set
  label: Set Tuner Mode
  kind: action
  command: "S{client_id}TUNR{data}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0002"]
      value_meanings: { "0000": "Antenna", "0002": "Cable" }

- id: tunr_query
  label: Query Tuner Mode
  kind: query
  command: "Q{client_id}TUNR????{checksum}\r"
  params: []

- id: tscn0001
  label: Automatic Channel Search
  kind: action
  command: "S{client_id}TSCN0001{checksum}\r"
  notes: "GENERIC HEX (client_id=ALL): 53 41 4C 4C 54 53 43 4E 30 30 30 31 DB 0D"
  params: []

# ---- Channel ----
- id: chan_set
  label: Channel Up/Down
  kind: action
  command: "S{client_id}CHAN{data}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001"]
      value_meanings: { "0000": "Channel down", "0001": "Channel up" }

# ---- Caption ----
- id: cc_set
  label: Set Closed Caption
  kind: action
  command: "S{client_id}CC##{data}{checksum}\r"
  notes: "Source command string is 'CC##' literally; # chars are part of the command mnemonic, not a parameter placeholder."
  params:
    - name: data
      type: enum
      values: ["0000", "0002", "0003"]
      value_meanings:
        "0000": "CC off"
        "0002": "CC on"
        "0003": "CC on when mute"

- id: cc_query
  label: Query Closed Caption
  kind: query
  command: "Q{client_id}CC##????{checksum}\r"
  params: []

- id: rset9999
  label: Restore Factory Settings
  kind: action
  command: "S{client_id}RSET9999{checksum}\r"
  notes: "GENERIC HEX (client_id=ALL): 53 41 4C 4C 52 53 45 54 39 39 39 39 B2 0D"
  params: []

# ---- OSD Language ----
- id: lang_set
  label: Set OSD Language
  kind: action
  command: "S{client_id}LANG{data}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0002", "0003"]
      value_meanings: { "0000": "English", "0002": "Español", "0003": "Français" }

- id: lang_query
  label: Query OSD Language
  kind: query
  command: "Q{client_id}LANG????{checksum}\r"
  params: []

# ---- Standby LED ----
- id: pled_set
  label: Set Standby LED
  kind: action
  command: "S{client_id}PLED{data}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0002"]
      value_meanings: { "0000": "Off", "0002": "On" }

- id: pled_query
  label: Query Standby LED
  kind: query
  command: "Q{client_id}PLED????{checksum}\r"
  params: []

# ---- Remote Button Simulator (BTTN 1xxx series) ----
# Each named button press is one command. Documented 4-digit parameter after BTTN.
- id: bttn_ch_plus
  label: Remote Button - Channel+
  kind: action
  command: "S{client_id}BTTN1034{checksum}\r"
  params: []

- id: bttn_ch_minus
  label: Remote Button - Channel-
  kind: action
  command: "S{client_id}BTTN1035{checksum}\r"
  params: []

- id: bttn_vol_minus
  label: Remote Button - Volume-
  kind: action
  command: "S{client_id}BTTN1032{checksum}\r"
  params: []

- id: bttn_vol_plus
  label: Remote Button - Volume+
  kind: action
  command: "S{client_id}BTTN1033{checksum}\r"
  params: []

- id: bttn_back
  label: Remote Button - Back
  kind: action
  command: "S{client_id}BTTN1045{checksum}\r"
  params: []

- id: bttn_power
  label: Remote Button - Power
  kind: action
  command: "S{client_id}BTTN1012{checksum}\r"
  params: []

- id: bttn_mute
  label: Remote Button - Mute
  kind: action
  command: "S{client_id}BTTN1031{checksum}\r"
  params: []

- id: bttn_dash
  label: Remote Button - Dash (-)
  kind: action
  command: "S{client_id}BTTN1010{checksum}\r"
  params: []

- id: bttn_input
  label: Remote Button - Input
  kind: action
  command: "S{client_id}BTTN1036{checksum}\r"
  params: []

- id: bttn_himedia
  label: Remote Button - Media Player (HiMedia)
  kind: action
  command: "S{client_id}BTTN1023{checksum}\r"
  params: []

- id: bttn_digit_0
  label: Remote Button - Digit 0
  kind: action
  command: "S{client_id}BTTN1000{checksum}\r"
  params: []

- id: bttn_digit_1
  label: Remote Button - Digit 1
  kind: action
  command: "S{client_id}BTTN1001{checksum}\r"
  params: []

- id: bttn_digit_2
  label: Remote Button - Digit 2
  kind: action
  command: "S{client_id}BTTN1002{checksum}\r"
  params: []

- id: bttn_digit_3
  label: Remote Button - Digit 3
  kind: action
  command: "S{client_id}BTTN1003{checksum}\r"
  params: []

- id: bttn_digit_4
  label: Remote Button - Digit 4
  kind: action
  command: "S{client_id}BTTN1004{checksum}\r"
  params: []

- id: bttn_digit_5
  label: Remote Button - Digit 5
  kind: action
  command: "S{client_id}BTTN1005{checksum}\r"
  params: []

- id: bttn_digit_6
  label: Remote Button - Digit 6
  kind: action
  command: "S{client_id}BTTN1006{checksum}\r"
  params: []

- id: bttn_digit_7
  label: Remote Button - Digit 7
  kind: action
  command: "S{client_id}BTTN1007{checksum}\r"
  params: []

- id: bttn_digit_8
  label: Remote Button - Digit 8
  kind: action
  command: "S{client_id}BTTN1008{checksum}\r"
  params: []

- id: bttn_digit_9
  label: Remote Button - Digit 9
  kind: action
  command: "S{client_id}BTTN1009{checksum}\r"
  params: []

- id: bttn_sleep
  label: Remote Button - Sleep
  kind: action
  command: "S{client_id}BTTN1024{checksum}\r"
  params: []

- id: bttn_mts_sap
  label: Remote Button - MTS/SAP
  kind: action
  command: "S{client_id}BTTN1054{checksum}\r"
  params: []

- id: bttn_live_tv
  label: Remote Button - Live TV
  kind: action
  command: "S{client_id}BTTN1055{checksum}\r"
  params: []

- id: bttn_pause
  label: Remote Button - Pause
  kind: action
  command: "S{client_id}BTTN1018{checksum}\r"
  params: []

- id: bttn_play
  label: Remote Button - Play
  kind: action
  command: "S{client_id}BTTN1016{checksum}\r"
  params: []

- id: bttn_menu
  label: Remote Button - Menu
  kind: action
  command: "S{client_id}BTTN1038{checksum}\r"
  params: []

- id: bttn_exit
  label: Remote Button - Exit
  kind: action
  command: "S{client_id}BTTN1046{checksum}\r"
  params: []

- id: bttn_stop
  label: Remote Button - Stop
  kind: action
  command: "S{client_id}BTTN1020{checksum}\r"
  params: []

- id: bttn_frw
  label: Remote Button - Fast Rewind (<<)
  kind: action
  command: "S{client_id}BTTN1015{checksum}\r"
  params: []

- id: bttn_cc
  label: Remote Button - CC
  kind: action
  command: "S{client_id}BTTN1027{checksum}\r"
  params: []

- id: bttn_red
  label: Remote Button - Red
  kind: action
  command: "S{client_id}BTTN1050{checksum}\r"
  params: []

- id: bttn_green
  label: Remote Button - Green
  kind: action
  command: "S{client_id}BTTN1051{checksum}\r"
  params: []

- id: bttn_yellow
  label: Remote Button - Yellow
  kind: action
  command: "S{client_id}BTTN1053{checksum}\r"
  params: []

- id: bttn_blue
  label: Remote Button - Blue
  kind: action
  command: "S{client_id}BTTN1052{checksum}\r"
  params: []

- id: bttn_up
  label: Remote Button - Up Arrow
  kind: action
  command: "S{client_id}BTTN1041{checksum}\r"
  params: []

- id: bttn_down
  label: Remote Button - Down Arrow
  kind: action
  command: "S{client_id}BTTN1042{checksum}\r"
  params: []

- id: bttn_left
  label: Remote Button - Left Arrow
  kind: action
  command: "S{client_id}BTTN1043{checksum}\r"
  params: []

- id: bttn_right
  label: Remote Button - Right Arrow
  kind: action
  command: "S{client_id}BTTN1044{checksum}\r"
  params: []

- id: bttn_ok_enter
  label: Remote Button - OK/Enter
  kind: action
  command: "S{client_id}BTTN1040{checksum}\r"
  params: []

- id: bttn_ffw
  label: Remote Button - Fast Forward (>>)
  kind: action
  command: "S{client_id}BTTN1017{checksum}\r"
  params: []

- id: bttn_previous
  label: Remote Button - Previous (<<)
  kind: action
  command: "S{client_id}BTTN1019{checksum}\r"
  params: []

- id: bttn_next
  label: Remote Button - Next (>>)
  kind: action
  command: "S{client_id}BTTN1021{checksum}\r"
  params: []

- id: bttn_hismart
  label: Remote Button - Connected Home (HiSmart)
  kind: action
  command: "S{client_id}BTTN1039{checksum}\r"
  params: []

# ---- Power Off Control Mode ----
- id: pbtn_set
  label: Set Power Off Control Mode
  kind: action
  command: "S{client_id}PBTN{data}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001"]
      value_meanings: { "0000": "AC ONLY", "0001": "ALL" }

- id: pbtn_query
  label: Query Power Off Control Mode
  kind: query
  command: "Q{client_id}PBTN????{checksum}\r"
  params: []

# ---- Volume Range ----
- id: mavl_set
  label: Set Volume Range
  kind: action
  command: "S{client_id}MAVL{data}{checksum}\r"
  params:
    - name: data
      type: integer
      description: "Volume range 0-100, encoded as 4-digit zero-padded decimal"

- id: mavl_query
  label: Query Volume Range
  kind: query
  command: "Q{client_id}MAVL????{checksum}\r"
  notes: "Returns 0-100"
  params: []

# ---- Volume Control Mode ----
- id: svol_set
  label: Set Volume Control Mode
  kind: action
  command: "S{client_id}SVOL{data}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001", "0002", "0003"]
      value_meanings:
        "0000": "LOCKED"
        "0001": "LAST VOLUME"
        "0002": "AC RESET"
        "0003": "STANDBY RESET"

- id: svol_query
  label: Query Volume Control Mode
  kind: query
  command: "Q{client_id}SVOL????{checksum}\r"
  params: []

# ---- Volume Locked Level ----
- id: vlfl_set
  label: Set Volume Locked Level
  kind: action
  command: "S{client_id}VLFL{data}{checksum}\r"
  params:
    - name: data
      type: integer
      description: "Volume locked level 0-100, encoded as 4-digit zero-padded decimal"

- id: vlfl_query
  label: Query Volume Locked Level
  kind: query
  command: "Q{client_id}VLFL????{checksum}\r"
  notes: "Returns 0-100"
  params: []

# ---- Remote Key ----
- id: rmot_set
  label: Set Remote Key
  kind: action
  command: "S{client_id}RMOT{data}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001", "0002"]
      value_meanings: { "0000": "ENABLE", "0001": "DISABLE", "0002": "PARTIAL" }

- id: rmot_query
  label: Query Remote Key
  kind: query
  command: "Q{client_id}RMOT????{checksum}\r"
  params: []

# ---- Panel Key ----
- id: panl_set
  label: Set Panel Key
  kind: action
  command: "S{client_id}PANL{data}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001"]
      value_meanings: { "0000": "ENABLE", "0001": "DISABLE" }

- id: panl_query
  label: Query Panel Key
  kind: query
  command: "Q{client_id}PANL????{checksum}\r"
  params: []

# ---- Menu Access ----
- id: menu_set
  label: Set Menu Access
  kind: action
  command: "S{client_id}MENU{data}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001"]
      value_meanings: { "0000": "ENABLE", "0001": "DISABLE" }

- id: menu_query
  label: Query Menu Access
  kind: query
  command: "Q{client_id}MENU????{checksum}\r"
  params: []

# ---- AV Setting Menu ----
- id: avmn_set
  label: Set AV Setting Menu
  kind: action
  command: "S{client_id}AVMN{data}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001"]
      value_meanings: { "0000": "DISABLE", "0001": "ENABLE" }

- id: avmn_query
  label: Query AV Setting Menu
  kind: query
  command: "Q{client_id}AVMN????{checksum}\r"
  params: []

# ---- OSD Mode ----
- id: osd_set
  label: Set OSD Mode
  kind: action
  command: "S{client_id}OSD#{data}{checksum}\r"
  notes: "Source command string is 'OSD#' literally; # char is part of the command mnemonic, not a parameter placeholder."
  params:
    - name: data
      type: enum
      values: ["0000", "0001"]
      value_meanings: { "0000": "ENABLE", "0001": "DISABLE" }

- id: osd_query
  label: Query OSD Mode
  kind: query
  command: "Q{client_id}OSD#????{checksum}\r"
  params: []

# ---- Input Mode ----
- id: inpm_set
  label: Set Input Mode
  kind: action
  command: "S{client_id}INPM{data}{checksum}\r"
  params:
    - name: data
      type: enum
      values: ["0000", "0001", "0002", "0003"]
      value_meanings:
        "0000": "LOCKED"
        "0001": "SELECTABLE"
        "0002": "AC RESET"
        "0003": "STANDBY RESET"

- id: inpm_query
  label: Query Input Mode
  kind: query
  command: "Q{client_id}INPM????{checksum}\r"
  params: []

# ---- Power On Input Source (truncated at end of source) ----
- id: pois_set
  label: Set Power-On Input Source
  kind: action
  command: "S{client_id}POIS{data}{checksum}\r"
  notes: "Source row was truncated; only POIS0000..POIS0003 visible. Additional values may exist beyond POIS0003 but are not in this refined source."
  params:
    - name: data
      type: enum
      values: ["0000", "0001", "0002", "0003"]
      value_meanings:
        "0000": "LAST"
        "0001": "Air"
        "0002": "AV"
        "0003": "Component"
```

## Feedbacks
```yaml
- id: ack_status
  type: enum
  description: "Per-command acknowledgement. Common ACK strings from source: OKAY, EROR, WAIT."
  values: [OKAY, EROR, WAIT]
- id: input_state
  type: enum
  description: "INPT query return value. Encodes currently-selected input source."
  values: ["1", "3", "4", "6", "9", "10", "11", "12"]
  value_meanings:
    "1": "TV"
    "3": "Component"
    "4": "AV"
    "6": "VGA"
    "9": "HDMI1"
    "10": "HDMI2"
    "11": "HDMI3"
    "12": "HDMI4"
- id: power_on_command_setting
  type: enum
  description: "PWRE query return value."
  values: ["0", "1"]
  value_meanings: { "0": "Disabled (RS-232 cannot power on from standby)", "1": "Enabled (RS-232 can power on from standby)" }
- id: mute_state
  type: enum
  description: "MUTE query return value."
  values: ["0", "1"]
  value_meanings: { "0": "Not mute", "1": "Mute" }
```

## Variables
```yaml
# Discrete settable parameters with continuous ranges. Each carries its own
# command in Actions; the range bound is documented in params.
- id: brightness
  range: 0-100
  encoding: "4-digit zero-padded decimal"
  command_action: brit_set
  query_action: brit_query
- id: contrast
  range: 0-100
  encoding: "4-digit zero-padded decimal"
  command_action: cont_set
  query_action: cont_query
- id: color_saturation
  range: 0-100
  encoding: "4-digit zero-padded decimal"
  command_action: colr_set
  query_action: colr_query
- id: tint
  range: 0-100
  encoding: "4-digit zero-padded decimal"
  command_action: tint_set
  query_action: tint_query
- id: sharpness
  range: 0-20
  encoding: "4-digit zero-padded decimal"
  command_action: shrp_set
  query_action: shrp_query
- id: backlight
  range: 0-100
  encoding: "4-digit zero-padded decimal"
  command_action: bklv_set
  query_action: bklv_query
- id: volume
  range: 0-100
  encoding: "4-digit zero-padded decimal"
  command_action: volm_set
  query_action: volm_query
- id: volume_range_max
  range: 0-100
  encoding: "4-digit zero-padded decimal"
  command_action: mavl_set
  query_action: mavl_query
- id: volume_locked_level
  range: 0-100
  encoding: "4-digit zero-padded decimal"
  command_action: vlfl_set
  query_action: vlfl_query
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited event/notification scheme.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step sequences as named macros.
# Power-on-from-standby requires a 2-step sequence: enable PWRE, then send POWR0001.
# Documented as separate actions (pwre_enable, powr_on) for implementer composition.
```

## Safety
```yaml
confirmation_required_for: []  # UNRESOLVED: source has no explicit safety warnings or confirmation requirements.
interlocks: []
# UNRESOLVED: source describes configuration preconditions for RS-232 (Custom Install
# menu must be enabled; Power On Command must be enabled for standby power-on) but no
# safety interlocks. See Notes for preconditions.
```

## Notes

**Preconditions for serial control (source § "TV Setup"):**
1. Access the Custom Install menu: power on TV, press Quick Settings key on remote, enter `7 3 1 0` with the number keys. The Custom Install menu appears.
2. Set `Custom Installation` to `Enable` to activate the RS-232 port.
3. To power the TV on via RS-232 from standby, set `Power On Command` to `Enable` before exiting the Custom Install menu.

**Connector (source § "Physical Definition"):**
- TV side: DB9 female D-sub chassis mount.
- PC/Controller side: a USB-to-Serial adapter is required if the controller has only USB.

**Protocol quirks (source § "Basic Format for Control"):**
- Protocol is case-sensitive.
- Frame is fixed-length; checksum is the 1-byte two's-complement such that the sum of OPERATION + CLIENT_ID + COMMAND + DATA + CHECKSUM is an exact multiple of 256 (low byte = 0). The CR (0x0D) terminator is not included in the checksum.
- Common ACKs: `OKAY`, `EROR`, `WAIT`. A `WAIT` may be followed by a separate `OKAY`/`EROR` line.
- Generic HEX commands use client_id=`ALL` (broadcast). For per-TV addressing on a multi-TV bus, use the last 3 bytes of that TV's Ethernet MAC as the client_id; the source provides worked HEX examples for client_id `465`.

**Coverage gaps:**
- Model "5U88KM" is not named in the source; source is the generic HiSense Prosumer TV RS-232 protocol document.
- IR command table (POWER/INPUT/HDMI.1..5/PICTURE MODE/etc. with Pronto CCF codes) is in the source but is out of scope for an RS-232 control spec and is not represented as Actions.
- `POIS` set command (Power-On Input Source) row was truncated at the end of the refined source; only values 0000..0003 are populated.
- User-supplied protocol hint of "TCP/IP" is not supported by the source — the source explicitly describes an RS-232 (DB9) transport. If an IP variant exists, it would come from a separate document (e.g. `downloadId=784` referenced in the prior discovery memo), not this one.
```

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-06-02T21:41:56.217Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:56.217Z
matched_actions: 112
action_count: 112
confidence: medium
summary: "All 112 spec actions matched verbatim in source RS-232 command table with correct shapes and transport; 4 extra source command families (SPKM, B2BM, USBM, PSHF) not in spec but count is <=5 so short threshold is not triggered; coverage ratio 38/42=0.905 meets the 0.9 floor. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- SPKM
- B2BM
- USBM
- PSHF
- "model \"5U88KM\" is not named in the source document; source is the generic HiSense Prosumer TV RS-232 protocol. User-supplied hint of \"TCP/IP\" is not supported by the source — source is RS-232 only. IR section of source is not represented as Actions (out of scope for machine protocol). POIS0000..POIS0003 visible; remainder of the POIS row list was truncated at end of source."
- "source does not document any unsolicited event/notification scheme."
- "source does not document any multi-step sequences as named macros."
- "source has no explicit safety warnings or confirmation requirements."
- "source describes configuration preconditions for RS-232 (Custom Install"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
