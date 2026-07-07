---
spec_id: admin/artison-back-pack
schema_version: ai4av-public-spec-v1
revision: 1
title: "Artison Back Pack Control Spec"
manufacturer: Artison
model_family: "Back Pack"
aliases: []
compatible_with:
  manufacturers:
    - Artison
  models:
    - "Back Pack"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sav-documentation.s3.amazonaws.com
source_urls:
  - "https://sav-documentation.s3.amazonaws.com/Product%20Reference%20Guides/009-1794-00%20Artison%20Nano%20Backpack%20P5%20IR%20and%20IP%20Protocol.xlsx"
retrieved_at: 2026-07-03T18:21:41.687Z
last_checked_at: 2026-07-07T10:58:22.810Z
generated_at: 2026-07-07T10:58:22.810Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "entity_id not a real Convex ID; firmware version, input-level trim range, and audio/video format enums not stated in source."
  - "range/units not stated in source\""
  - "exact enum strings not enumerated in source"
  - "range/units not stated in source"
  - "format enum not stated in source"
  - "version not stated in source"
  - "range not stated in source"
  - "confirm whether device emits asynchronous state-change events."
  - "real Convex entity_id; firmware version; input-level trim range/units; power_state / video_format / audio_format exact enum values; whether async events are emitted."
verification:
  verdict: verified
  checked_at: 2026-07-07T10:58:22.810Z
  matched_actions: 134
  action_count: 134
  confidence: medium
  summary: "All 134 spec actions matched verbatim in source table; transport port 50006 confirmed; no extra commands. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-03
---

# Artison Back Pack Control Spec

## Summary
The Artison Back Pack is an IP-controllable soundbar/amplifier accessory. This spec covers its CMD Protocol v1.4 (February 2019) telnet interface over TCP port 50006, including volume, mute, power, network standby, input selection (DLNA, HDMI 1–3, TV/ARC, Optical, AUX, Bluetooth), per-input surround-mode control, per-input level/trim control, OSD navigation, CEC, and audio/video format plus firmware queries. A separate IR (NEC) remote-code table exists in the source but is out of scope for this TCP transport spec.

<!-- UNRESOLVED: entity_id not a real Convex ID; firmware version, input-level trim range, and audio/video format enums not stated in source. -->

## Transport
```yaml
protocols:
  - tcp  # "telnet communication port for Backpack is - 50006"
addressing:
  port: 50006
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from !PWR ON/OFF and !NS ON/OFF commands
  - routable     # inferred from !IN {input} source-select commands
  - levelable    # inferred from !VOL {level} and !SLVL {input} {level} commands
  - queryable    # inferred from multiple !... QS query commands
```

## Actions
```yaml
# All commands sent as ASCII strings terminated with [CR][LF] over TCP port 50006.
# HEX data equivalents appear in the source; ASCII command string is the implementable payload.

# --- Volume ---
- id: volume_up
  label: Volume Up
  kind: action
  command: "!VOL UP[CR][LF]"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "!VOL DOWN[CR][LF]"
  params: []

- id: volume_level_set
  label: Volume Level Set
  kind: action
  command: "!VOL {level}[CR][LF]"
  params:
    - name: level
      type: integer
      description: "Target volume level. Range = 0 (min) to 100 (max)"

- id: volume_query
  label: Volume Query Status
  kind: query
  command: "!VOL QS[CR][LF]"
  params: []

# --- Mute ---
- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "!MUT TOG[CR][LF]"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "!MUT ON[CR][LF]"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "!MUT OFF[CR][LF]"
  params: []

- id: mute_query
  label: Mute Query Status
  kind: query
  command: "!MUT QS[CR][LF]"
  params: []

# --- Network Standby ---
- id: network_standby_toggle
  label: Network Standby Toggle
  kind: action
  command: "!NS TOG[CR][LF]"
  params: []

- id: network_standby_on
  label: Network Standby On
  kind: action
  command: "!NS ON[CR][LF]"
  params: []

- id: network_standby_off
  label: Network Standby Off
  kind: action
  command: "!NS OFF[CR][LF]"
  params: []

- id: network_standby_query
  label: Network Standby Query Status
  kind: query
  command: "!NS QS[CR][LF]"
  params: []

# --- Input Select (8 sources) ---
- id: select_input_dlna
  label: Input Select DLNA
  kind: action
  command: "!IN DLNA[CR][LF]"
  params: []

- id: select_input_hdmi1
  label: Input Select HDMI 1
  kind: action
  command: "!IN HDMI1[CR][LF]"
  params: []

- id: select_input_hdmi2
  label: Input Select HDMI 2
  kind: action
  command: "!IN HDMI2[CR][LF]"
  params: []

- id: select_input_hdmi3
  label: Input Select HDMI 3
  kind: action
  command: "!IN HDMI3[CR][LF]"
  params: []

- id: select_input_tvarc
  label: Input Select TV (ARC)
  kind: action
  command: "!IN TVARC[CR][LF]"
  params: []

- id: select_input_bt
  label: Input Select BT
  kind: action
  command: "!IN BT[CR][LF]"
  params: []

- id: select_input_aux
  label: Input Select AUX
  kind: action
  command: "!IN AUX[CR][LF]"
  params: []

- id: select_input_opt
  label: Input Select OPT
  kind: action
  command: "!IN OPT[CR][LF]"
  params: []

- id: input_query
  label: Input Query Status
  kind: query
  command: "!IN QS[CR][LF]"
  params: []

# --- Surround Mode Toggle (per input, 8) ---
- id: surround_toggle_dlna
  label: Surround Mode Toggle DLNA
  kind: action
  command: "!SMOD DLNA TOG[CR][LF]"
  params: []

- id: surround_toggle_hdmi1
  label: Surround Mode Toggle HDMI 1
  kind: action
  command: "!SMOD HDMI1 TOG[CR][LF]"
  params: []

- id: surround_toggle_hdmi2
  label: Surround Mode Toggle HDMI 2
  kind: action
  command: "!SMOD HDMI2 TOG[CR][LF]"
  params: []

- id: surround_toggle_hdmi3
  label: Surround Mode Toggle HDMI 3
  kind: action
  command: "!SMOD HDMI3 TOG[CR][LF]"
  params: []

- id: surround_toggle_tvarc
  label: Surround Mode Toggle TV (ARC)
  kind: action
  command: "!SMOD TVARC TOG[CR][LF]"
  params: []

- id: surround_toggle_opt
  label: Surround Mode Toggle OPT
  kind: action
  command: "!SMOD OPT TOG[CR][LF]"
  params: []

- id: surround_toggle_aux
  label: Surround Mode Toggle AUX
  kind: action
  command: "!SMOD AUX TOG[CR][LF]"
  params: []

- id: surround_toggle_bt
  label: Surround Mode Toggle BT
  kind: action
  command: "!SMOD BT TOG[CR][LF]"
  params: []

# --- Set Surround Mode per input x 6 modes (48) ---
# Modes: 2STEREO, 5STEREO, PLIIMOV (Dolby PLII Cinema), PLIIMUS (Dolby PLII Music), DTSMUS (DTS Neo:6 Music), DTSMOV (DTS Neo:6 Cinema)

# 2CH Stereo
- { id: set_surround_dlna_2stereo,   label: "Set DLNA 2CH Stereo",     kind: action, command: "!SMOD DLNA 2STEREO[CR][LF]",   params: [] }
- { id: set_surround_hdmi1_2stereo,  label: "Set HDMI 1 2CH Stereo",   kind: action, command: "!SMOD HDMI1 2STEREO[CR][LF]",  params: [] }
- { id: set_surround_hdmi2_2stereo,  label: "Set HDMI 2 2CH Stereo",   kind: action, command: "!SMOD HDMI2 2STEREO[CR][LF]",  params: [] }
- { id: set_surround_hdmi3_2stereo,  label: "Set HDMI 3 2CH Stereo",   kind: action, command: "!SMOD HDMI3 2STEREO[CR][LF]",  params: [] }
- { id: set_surround_tvarc_2stereo,  label: "Set TV (ARC) 2CH Stereo", kind: action, command: "!SMOD TVARC 2STEREO[CR][LF]",  params: [] }
- { id: set_surround_opt_2stereo,    label: "Set OPT 2CH Stereo",      kind: action, command: "!SMOD OPT 2STEREO[CR][LF]",    params: [] }
- { id: set_surround_aux_2stereo,    label: "Set AUX 2CH Stereo",      kind: action, command: "!SMOD AUX 2STEREO[CR][LF]",    params: [] }
- { id: set_surround_bt_2stereo,     label: "Set BT 2CH Stereo",       kind: action, command: "!SMOD BT 2STEREO[CR][LF]",     params: [] }

# 5CH Stereo
- { id: set_surround_dlna_5stereo,   label: "Set DLNA 5CH Stereo",     kind: action, command: "!SMOD DLNA 5STEREO[CR][LF]",   params: [] }
- { id: set_surround_hdmi1_5stereo,  label: "Set HDMI 1 5CH Stereo",   kind: action, command: "!SMOD HDMI1 5STEREO[CR][LF]",  params: [] }
- { id: set_surround_hdmi2_5stereo,  label: "Set HDMI 2 5CH Stereo",   kind: action, command: "!SMOD HDMI2 5STEREO[CR][LF]",  params: [] }
- { id: set_surround_hdmi3_5stereo,  label: "Set HDMI 3 5CH Stereo",   kind: action, command: "!SMOD HDMI3 5STEREO[CR][LF]",  params: [] }
- { id: set_surround_tvarc_5stereo,  label: "Set TV (ARC) 5CH Stereo", kind: action, command: "!SMOD TVARC 5STEREO[CR][LF]",  params: [] }
- { id: set_surround_opt_5stereo,    label: "Set OPT 5CH Stereo",      kind: action, command: "!SMOD OPT 5STEREO[CR][LF]",    params: [] }
- { id: set_surround_aux_5stereo,    label: "Set AUX 5CH Stereo",      kind: action, command: "!SMOD AUX 5STEREO[CR][LF]",    params: [] }
- { id: set_surround_bt_5stereo,     label: "Set BT 5CH Stereo",       kind: action, command: "!SMOD BT 5STEREO[CR][LF]",     params: [] }

# Dolby PLII Cinema (PLIIMOV)
- { id: set_surround_dlna_pliimov,   label: "Set DLNA PLII Movie",     kind: action, command: "!SMOD DLNA PLIIMOV[CR][LF]",   params: [] }
- { id: set_surround_hdmi1_pliimov,  label: "Set HDMI 1 PLII Movie",   kind: action, command: "!SMOD HDMI1 PLIIMOV[CR][LF]",  params: [] }
- { id: set_surround_hdmi2_pliimov,  label: "Set HDMI 2 PLII Movie",   kind: action, command: "!SMOD HDMI2 PLIIMOV[CR][LF]",  params: [] }
- { id: set_surround_hdmi3_pliimov,  label: "Set HDMI 3 PLII Movie",   kind: action, command: "!SMOD HDMI3 PLIIMOV[CR][LF]",  params: [] }
- { id: set_surround_tvarc_pliimov,  label: "Set TV (ARC) PLII Movie", kind: action, command: "!SMOD TVARC PLIIMOV[CR][LF]",  params: [] }
- { id: set_surround_opt_pliimov,    label: "Set OPT PLII Movie",      kind: action, command: "!SMOD OPT PLIIMOV[CR][LF]",    params: [] }
- { id: set_surround_aux_pliimov,    label: "Set AUX PLII Movie",      kind: action, command: "!SMOD AUX PLIIMOV[CR][LF]",    params: [] }
- { id: set_surround_bt_pliimov,     label: "Set BT PLII Movie",       kind: action, command: "!SMOD BT PLIIMOV[CR][LF]",     params: [] }

# Dolby PLII Music (PLIIMUS)
- { id: set_surround_dlna_pliimus,   label: "Set DLNA PLII Music",     kind: action, command: "!SMOD DLNA PLIIMUS[CR][LF]",   params: [] }
- { id: set_surround_hdmi1_pliimus,  label: "Set HDMI 1 PLII Music",   kind: action, command: "!SMOD HDMI1 PLIIMUS[CR][LF]",  params: [] }
- { id: set_surround_hdmi2_pliimus,  label: "Set HDMI 2 PLII Music",   kind: action, command: "!SMOD HDMI2 PLIIMUS[CR][LF]",  params: [] }
- { id: set_surround_hdmi3_pliimus,  label: "Set HDMI 3 PLII Music",   kind: action, command: "!SMOD HDMI3 PLIIMUS[CR][LF]",  params: [] }
- { id: set_surround_tvarc_pliimus,  label: "Set TV (ARC) PLII Music", kind: action, command: "!SMOD TVARC PLIIMUS[CR][LF]",  params: [] }
- { id: set_surround_opt_pliimus,    label: "Set OPT PLII Music",      kind: action, command: "!SMOD OPT PLIIMUS[CR][LF]",    params: [] }
- { id: set_surround_aux_pliimus,    label: "Set AUX PLII Music",      kind: action, command: "!SMOD AUX PLIIMUS[CR][LF]",    params: [] }
- { id: set_surround_bt_pliimus,     label: "Set BT PLII Music",       kind: action, command: "!SMOD BT PLIIMUS[CR][LF]",     params: [] }

# DTS Neo:6 Music (DTSMUS)
- { id: set_surround_dlna_dtsmus,    label: "Set DLNA DTS Neo:6 Music",    kind: action, command: "!SMOD DLNA DTSMUS[CR][LF]",  params: [] }
- { id: set_surround_hdmi1_dtsmus,   label: "Set HDMI 1 DTS Neo:6 Music",  kind: action, command: "!SMOD HDMI1 DTSMUS[CR][LF]", params: [] }
- { id: set_surround_hdmi2_dtsmus,   label: "Set HDMI 2 DTS Neo:6 Music",  kind: action, command: "!SMOD HDMI2 DTSMUS[CR][LF]", params: [] }
- { id: set_surround_hdmi3_dtsmus,   label: "Set HDMI 3 DTS Neo:6 Music",  kind: action, command: "!SMOD HDMI3 DTSMUS[CR][LF]", params: [] }
- { id: set_surround_tvarc_dtsmus,   label: "Set TV (ARC) DTS Neo:6 Music",kind: action, command: "!SMOD TVARC DTSMUS[CR][LF]", params: [] }
- { id: set_surround_opt_dtsmus,     label: "Set OPT DTS Neo:6 Music",     kind: action, command: "!SMOD OPT DTSMUS[CR][LF]",   params: [] }
- { id: set_surround_aux_dtsmus,     label: "Set AUX DTS Neo:6 Music",     kind: action, command: "!SMOD AUX DTSMUS[CR][LF]",   params: [] }
- { id: set_surround_bt_dtsmus,      label: "Set BT DTS Neo:6 Music",      kind: action, command: "!SMOD BT DTSMUS[CR][LF]",     params: [] }

# DTS Neo:6 Cinema (DTSMOV)
- { id: set_surround_dlna_dtsmov,    label: "Set DLNA DTS Neo:6 Cinema",    kind: action, command: "!SMOD DLNA DTSMOV[CR][LF]",  params: [] }
- { id: set_surround_hdmi1_dtsmov,   label: "Set HDMI 1 DTS Neo:6 Cinema",  kind: action, command: "!SMOD HDMI1 DTSMOV[CR][LF]", params: [] }
- { id: set_surround_hdmi2_dtsmov,   label: "Set HDMI 2 DTS Neo:6 Cinema",  kind: action, command: "!SMOD HDMI2 DTSMOV[CR][LF]", params: [] }
- { id: set_surround_hdmi3_dtsmov,   label: "Set HDMI 3 DTS Neo:6 Cinema",  kind: action, command: "!SMOD HDMI3 DTSMOV[CR][LF]", params: [] }
- { id: set_surround_tvarc_dtsmov,   label: "Set TV (ARC) DTS Neo:6 Cinema",kind: action, command: "!SMOD TVARC DTSMOV[CR][LF]", params: [] }
- { id: set_surround_opt_dtsmov,     label: "Set OPT DTS Neo:6 Cinema",     kind: action, command: "!SMOD OPT DTSMOV[CR][LF]",   params: [] }
- { id: set_surround_aux_dtsmov,     label: "Set AUX DTS Neo:6 Cinema",     kind: action, command: "!SMOD AUX DTSMOV[CR][LF]",   params: [] }
- { id: set_surround_bt_dtsmov,      label: "Set BT DTS Neo:6 Cinema",      kind: action, command: "!SMOD BT DTSMOV[CR][LF]",     params: [] }

# --- Get Surround Mode per input (8) ---
- { id: get_surround_dlna,  label: "Get DLNA Surround Mode",     kind: query, command: "!SMOD DLNA QS[CR][LF]",  params: [] }
- { id: get_surround_hdmi1, label: "Get HDMI 1 Surround Mode",   kind: query, command: "!SMOD HDMI1 QS[CR][LF]", params: [] }
- { id: get_surround_hdmi2, label: "Get HDMI 2 Surround Mode",   kind: query, command: "!SMOD HDMI2 QS[CR][LF]", params: [] }
- { id: get_surround_hdmi3, label: "Get HDMI 3 Surround Mode",   kind: query, command: "!SMOD HDMI3 QS[CR][LF]", params: [] }
- { id: get_surround_tvarc, label: "Get TV (ARC) Surround Mode", kind: query, command: "!SMOD TVARC QS[CR][LF]", params: [] }
- { id: get_surround_opt,   label: "Get OPT Surround Mode",      kind: query, command: "!SMOD OPT QS[CR][LF]",   params: [] }
- { id: get_surround_aux,   label: "Get AUX Surround Mode",      kind: query, command: "!SMOD AUX QS[CR][LF]",   params: [] }
- { id: get_surround_bt,    label: "Get BT Surround Mode",       kind: query, command: "!SMOD BT QS[CR][LF]",    params: [] }

# --- OSD Navigation (7) ---
- { id: osd_menu,  label: "OSD Menu",  kind: action, command: "!OSD MENU[CR][LF]",  params: [] }
- { id: osd_back,  label: "OSD Back",  kind: action, command: "!OSD BACK[CR][LF]",  params: [] }
- { id: osd_up,    label: "OSD Up",    kind: action, command: "!OSD UP[CR][LF]",    params: [] }
- { id: osd_down,  label: "OSD Down",  kind: action, command: "!OSD DOWN[CR][LF]",  params: [] }
- { id: osd_left,  label: "OSD Left",  kind: action, command: "!OSD LEFT[CR][LF]",  params: [] }
- { id: osd_right, label: "OSD Right", kind: action, command: "!OSD RIGHT[CR][LF]", params: [] }
- { id: osd_ok,    label: "OSD OK",    kind: action, command: "!OSD OK[CR][LF]",    params: [] }

# --- Power Control (3) ---
- id: power_on
  label: Power Control On
  kind: action
  command: "!PWR ON[CR][LF]"
  params: []

- id: power_off
  label: Power Control Off
  kind: action
  command: "!PWR OFF[CR][LF]"
  params: []

- id: power_query
  label: Power Query Status
  kind: query
  command: "!PWR QS[CR][LF]"
  params: []

# --- CEC (3) ---
- { id: cec_on,    label: "CEC On",           kind: action, command: "!CEC ON[CR][LF]",    params: [] }
- { id: cec_off,   label: "CEC Off",          kind: action, command: "!CEC OFF[CR][LF]",   params: [] }
- { id: cec_query, label: "CEC Query Status", kind: query,  command: "!CEC QS[CR][LF]",    params: [] }

# --- Bluetooth Pairing (1) ---
- { id: bt_pair, label: "BT Pairing", kind: action, command: "!BT PAIR[CR][LF]", params: [] }

# --- Format / Firmware Queries (3) ---
- { id: video_format_query,   label: "Incoming Video Format Query", kind: query, command: "!VFMT QS[CR][LF]", params: [] }
- { id: audio_format_query,   label: "Incoming Audio Format Query", kind: query, command: "!AFMT QS[CR][LF]", params: [] }
- { id: firmware_query,       label: "Firmware Query Status",      kind: query, command: "!FW QS[CR][LF]",    params: [] }

# --- Input Level (trim) per input: UP / DOWN / SET / QS (32) ---
# Level range not stated in source.

- { id: input_level_up_dlna,    label: "Input Level Up DLNA",    kind: action, command: "!SLVL DLNA UP[CR][LF]",    params: [] }
- { id: input_level_up_hdmi1,   label: "Input Level Up HDMI 1",  kind: action, command: "!SLVL HDMI1 UP[CR][LF]",  params: [] }
- { id: input_level_up_hdmi2,   label: "Input Level Up HDMI 2",  kind: action, command: "!SLVL HDMI2 UP[CR][LF]",  params: [] }
- { id: input_level_up_hdmi3,   label: "Input Level Up HDMI 3",  kind: action, command: "!SLVL HDMI3 UP[CR][LF]",  params: [] }
- { id: input_level_up_tvarc,   label: "Input Level Up TV (ARC)",kind: action, command: "!SLVL TVARC UP[CR][LF]",  params: [] }
- { id: input_level_up_opt,     label: "Input Level Up OPT",     kind: action, command: "!SLVL OPT UP[CR][LF]",    params: [] }
- { id: input_level_up_aux,     label: "Input Level Up AUX",     kind: action, command: "!SLVL AUX UP[CR][LF]",    params: [] }
- { id: input_level_up_bt,      label: "Input Level Up BT",      kind: action, command: "!SLVL BT UP[CR][LF]",     params: [] }

- { id: input_level_down_dlna,  label: "Input Level Down DLNA",    kind: action, command: "!SLVL DLNA DOWN[CR][LF]",  params: [] }
- { id: input_level_down_hdmi1, label: "Input Level Down HDMI 1",  kind: action, command: "!SLVL HDMI1 DOWN[CR][LF]",params: [] }
- { id: input_level_down_hdmi2, label: "Input Level Down HDMI 2",  kind: action, command: "!SLVL HDMI2 DOWN[CR][LF]",params: [] }
- { id: input_level_down_hdmi3, label: "Input Level Down HDMI 3",  kind: action, command: "!SLVL HDMI3 DOWN[CR][LF]",params: [] }
- { id: input_level_down_tvarc, label: "Input Level Down TV (ARC)",kind: action, command: "!SLVL TVARC DOWN[CR][LF]",params: [] }
- { id: input_level_down_opt,   label: "Input Level Down OPT",     kind: action, command: "!SLVL OPT DOWN[CR][LF]",  params: [] }
- { id: input_level_down_aux,   label: "Input Level Down AUX",     kind: action, command: "!SLVL AUX DOWN[CR][LF]",  params: [] }
- { id: input_level_down_bt,    label: "Input Level Down BT",      kind: action, command: "!SLVL BT DOWN[CR][LF]",   params: [] }

- id: input_level_set_dlna
  label: Input Level Set DLNA
  kind: action
  command: "!SLVL DLNA {level}[CR][LF]"
  params:
    - name: level
      type: integer
      description: "Target input level. # UNRESOLVED: range/units not stated in source"
- id: input_level_set_hdmi1
  label: Input Level Set HDMI 1
  kind: action
  command: "!SLVL HDMI1 {level}[CR][LF]"
  params:
    - name: level
      type: integer
      description: "Target input level. # UNRESOLVED: range/units not stated in source"
- id: input_level_set_hdmi2
  label: Input Level Set HDMI 2
  kind: action
  command: "!SLVL HDMI2 {level}[CR][LF]"
  params:
    - name: level
      type: integer
      description: "Target input level. # UNRESOLVED: range/units not stated in source"
- id: input_level_set_hdmi3
  label: Input Level Set HDMI 3
  kind: action
  command: "!SLVL HDMI3 {level}[CR][LF]"
  params:
    - name: level
      type: integer
      description: "Target input level. # UNRESOLVED: range/units not stated in source"
- id: input_level_set_tvarc
  label: Input Level Set TV (ARC)
  kind: action
  command: "!SLVL TVARC {level}[CR][LF]"
  params:
    - name: level
      type: integer
      description: "Target input level. # UNRESOLVED: range/units not stated in source"
- id: input_level_set_opt
  label: Input Level Set OPT
  kind: action
  command: "!SLVL OPT {level}[CR][LF]"
  params:
    - name: level
      type: integer
      description: "Target input level. # UNRESOLVED: range/units not stated in source"
- id: input_level_set_aux
  label: Input Level Set AUX
  kind: action
  command: "!SLVL AUX {level}[CR][LF]"
  params:
    - name: level
      type: integer
      description: "Target input level. # UNRESOLVED: range/units not stated in source"
- id: input_level_set_bt
  label: Input Level Set BT
  kind: action
  command: "!SLVL BT {level}[CR][LF]"
  params:
    - name: level
      type: integer
      description: "Target input level. # UNRESOLVED: range/units not stated in source"

- { id: input_level_query_dlna,  label: "Input Level Query DLNA",    kind: query, command: "!SLVL DLNA QS[CR][LF]",  params: [] }
- { id: input_level_query_hdmi1, label: "Input Level Query HDMI 1",  kind: query, command: "!SLVL HDMI1 QS[CR][LF]", params: [] }
- { id: input_level_query_hdmi2, label: "Input Level Query HDMI 2",  kind: query, command: "!SLVL HDMI2 QS[CR][LF]", params: [] }
- { id: input_level_query_hdmi3, label: "Input Level Query HDMI 3",  kind: query, command: "!SLVL HDMI3 QS[CR][LF]", params: [] }
- { id: input_level_query_tvarc, label: "Input Level Query TV (ARC)",kind: query, command: "!SLVL TVARC QS[CR][LF]", params: [] }
- { id: input_level_query_opt,   label: "Input Level Query OPT",     kind: query, command: "!SLVL OPT QS[CR][LF]",   params: [] }
- { id: input_level_query_aux,   label: "Input Level Query AUX",     kind: query, command: "!SLVL AUX QS[CR][LF]",   params: [] }
- { id: input_level_query_bt,    label: "Input Level Query BT",      kind: query, command: "!SLVL BT QS[CR][LF]",    params: [] }
```

## Feedbacks
```yaml
# Responses are ASCII strings prefixed with # and terminated [CR][LF].
- id: volume_level
  type: integer
  response: "#VOL X[CR][LF]"
  values: "0-100"

- id: mute_state
  type: enum
  response: "#MUT X[CR][LF]"
  values: [ON, OFF]

- id: network_standby_state
  type: enum
  response: "#NS X[CR][LF]"
  values: [ON, OFF]

- id: power_state
  type: enum
  response: "#PWR X[CR][LF]"
  values: [ON, OFF]  # UNRESOLVED: exact enum strings not enumerated in source

- id: input_source
  type: enum
  response: "#IN X[CR][LF]"
  values: [DLNA, HDMI1, HDMI2, HDMI3, TVARC, BT, AUX, OPT]

- id: surround_mode
  type: enum
  response: "#SMOD [INPUT] [SURROUND][CR][LF]"
  values: [2STEREO, 5STEREO, PLIIMOV, PLIIMUS, DTSMUS, DTSMOV]

- id: cec_state
  type: enum
  response: "#CEC X[CR][LF]"
  values: [ON, OFF]

- id: input_level
  type: integer
  response: "#SLVL [INPUT] X[CR][LF]"
  values: ""  # UNRESOLVED: range/units not stated in source

- id: video_format
  type: string
  response: "#VFMT X[CR][LF]"
  values: ""  # UNRESOLVED: format enum not stated in source

- id: audio_format
  type: string
  response: "#AFMT X[CR][LF]"
  values: ""  # UNRESOLVED: format enum not stated in source

- id: firmware_version
  type: string
  response: "#FW X[CR][LF]"
  values: ""  # UNRESOLVED: version not stated in source
```

## Variables
```yaml
- id: volume_level
  type: integer
  min: 0
  max: 100
  description: Master volume level (0 min to 100 max). Set via !VOL {level}; query via !VOL QS.

- id: input_level_trim
  type: integer
  min: null  # UNRESOLVED: range not stated in source
  max: null  # UNRESOLVED: range not stated in source
  description: Per-input level/trim. Set via !SLVL {input} {level}; query via !SLVL {input} QS.
```

## Events
```yaml
# No unsolicited notifications documented in source. All state is obtained via explicit QS queries.
# UNRESOLVED: confirm whether device emits asynchronous state-change events.
```

## Macros
```yaml
# No multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# No safety warnings, interlock procedures, or power-on sequencing requirements stated in source.
# Network Standby (!NS) affects availability of the IP interface while "off"; not a safety interlock.
```

## Notes
- Telnet interface on TCP port 50006; commands are ASCII strings terminated with `[CR][LF]`. Source also provides per-command HEX byte equivalents.
- Set-type surround-mode commands (`!SMOD {input} {mode}`) return **No Response** per the source — to confirm a change, issue the matching `!SMOD {input} QS` query.
- OSD navigation commands (`!OSD ...`) and BT Pair (`!BT PAIR`) return **No Response**.
- The `!MUT TOG` and `!NS TOG` toggle responses are documented as `#MUT ON` / `#MUT OFF` (and `#NS ON` / `#NS OFF`) indicating the resulting state.
- Source contains a separate **NEC IR remote code** table (Power On, Standby, Volume, Channel, Surround modes, inputs, navigation, etc.). These are infrared codes for the handheld remote, not the TCP transport, so they are excluded from the Actions above. Document them separately if an IR-blaster transport spec is needed.
- Source CMD Protocol version 1.4, last updated February 6th, 2019.

<!-- UNRESOLVED: real Convex entity_id; firmware version; input-level trim range/units; power_state / video_format / audio_format exact enum values; whether async events are emitted. -->
````

## Provenance

```yaml
source_domains:
  - sav-documentation.s3.amazonaws.com
source_urls:
  - "https://sav-documentation.s3.amazonaws.com/Product%20Reference%20Guides/009-1794-00%20Artison%20Nano%20Backpack%20P5%20IR%20and%20IP%20Protocol.xlsx"
retrieved_at: 2026-07-03T18:21:41.687Z
last_checked_at: 2026-07-07T10:58:22.810Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T10:58:22.810Z
matched_actions: 134
action_count: 134
confidence: medium
summary: "All 134 spec actions matched verbatim in source table; transport port 50006 confirmed; no extra commands. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "entity_id not a real Convex ID; firmware version, input-level trim range, and audio/video format enums not stated in source."
- "range/units not stated in source\""
- "exact enum strings not enumerated in source"
- "range/units not stated in source"
- "format enum not stated in source"
- "version not stated in source"
- "range not stated in source"
- "confirm whether device emits asynchronous state-change events."
- "real Convex entity_id; firmware version; input-level trim range/units; power_state / video_format / audio_format exact enum values; whether async events are emitted."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
