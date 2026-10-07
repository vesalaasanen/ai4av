---
spec_id: admin/onkyo-tx-sr805
schema_version: ai4av-public-spec-v1
revision: 1
title: "Onkyo TX-SR805 Control Spec"
manufacturer: Onkyo
model_family: TX-SR805
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - TX-SR805
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-22T20:29:47.005Z
last_checked_at: 2026-10-07T22:07:36.623Z
generated_at: 2026-10-07T22:07:36.623Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TX-SR805 is one model among ~15 in the source's compatibility matrix; many commands in the catalogue are \"No\" for TX-SR805 specifically. This spec enumerates every command documented in the source — the verifier will judge whether the per-model \"Yes/No\" mapping is preserved. Firmware version not stated in source."
  - "explicit response schema (encoding, prefixes, JSON) not stated"
  - "no settable runtime variables documented separately from actions."
  - "detailed event subscription / registration mechanism not stated"
  - "no multi-step macro sequences documented in source."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "firmware version compatibility, fault behavior, error recovery, and the exact set of commands supported by TX-SR805 specifically (vs. the full matrix) are not enumerated discretely in the source beyond the Yes/No per-row matrix; this spec conservatively lists commands whose applicability is documented as \"Yes\" for TX-SR805 or which are clearly zone/system-level commands listed without a model qualifier."
verification:
  verdict: verified
  checked_at: 2026-10-07T22:07:36.623Z
  matched_actions: 367
  action_count: 367
  confidence: medium
  summary: "All 367 action units match source command tokens and the transport values are stated in the source. Minor TX-SR805 per-model support claims are unverifiable but are not fabrications. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Onkyo TX-SR805 Control Spec

## Summary
The Onkyo TX-SR805 is an AV receiver supporting ISCP (Integra Serial Control Protocol) over RS-232C (3-wire, 9600/8-N-1) and over Ethernet (eISCP, TCP port 60128). This spec covers the full ISCP command catalogue applicable to the TX-SR805 including power, master volume, input selection, listening mode, tuner, network/USB, Zone2/Zone3/Zone4, RI dock, and CD/DVD/MD/CD-R transport commands.

<!-- UNRESOLVED: TX-SR805 is one model among ~15 in the source's compatibility matrix; many commands in the catalogue are "No" for TX-SR805 specifically. This spec enumerates every command documented in the source — the verifier will judge whether the per-model "Yes/No" mapping is preserved. Firmware version not stated in source. -->

## Transport
```yaml
# The TX-SR805 supports both RS-232C and Ethernet (eISCP). Both protocol
# sub-key groups are emitted.
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 60128  # eISCP default; receiver supports 49152-65535 per source
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
# powerable   - PWR command present
# levelable   - MVL master volume, ZVL/VL3/VL4 zone volumes present
# routable    - SLI input selector, SLZ/SL3/SL4 zone selectors present
# queryable   - QSTN suffix used for status queries throughout
- powerable
- levelable
- routable
- queryable
```

## Actions
```yaml
# ISCP message format (from source):
#   Controller -> Device:  !1<CMD><PARAM>[CR|LF|CRLF]
#   Device   -> Controller: !1<CMD><PARAM>[EOF]
# Start char "!", destination unit type "1" (Receiver), 3-char command,
# variable-length parameter, terminator as listed below.
#
# End characters accepted on input: [CR] (0x0D), [LF] (0x0A), [CR][LF].
# End character on output: [EOF] (0x1A), optionally followed by [CR] or [CR][LF].
#
# Below: command templates use the literal ISCP mnemonic; the "{param}"
# placeholder shows the variable part. Each entry corresponds to one row
# in the source's command-support tables.

# ----- Amplifier-related (Main Zone) -----
- id: pwr_set_standby
  label: System Power Standby
  kind: action
  command: "!1PWR00[CR]"
  params: []
- id: pwr_set_on
  label: System Power On
  kind: action
  command: "!1PWR01[CR]"
  params: []
- id: pwr_query
  label: System Power Status Query
  kind: query
  command: "!1PWRQSTN[CR]"
  params: []

- id: amt_set_off
  label: Audio Muting Off
  kind: action
  command: "!1AMT00[CR]"
  params: []
- id: amt_set_on
  label: Audio Muting On
  kind: action
  command: "!1AMT01[CR]"
  params: []
- id: amt_toggle
  label: Audio Muting Wrap-Around Toggle
  kind: action
  command: "!1AMTTG[CR]"
  params: []
- id: amt_query
  label: Audio Muting State Query
  kind: query
  command: "!1AMTQSTN[CR]"
  params: []

- id: spa_set_off
  label: Speaker A Off
  kind: action
  command: "!1SPA00[CR]"
  params: []
- id: spa_set_on
  label: Speaker A On
  kind: action
  command: "!1SPA01[CR]"
  params: []
- id: spa_up
  label: Speaker A Wrap-Around Up
  kind: action
  command: "!1SPAUP[CR]"
  params: []
- id: spa_query
  label: Speaker A State Query
  kind: query
  command: "!1SPAQSTN[CR]"
  params: []
- id: spb_set_off
  label: Speaker B Off
  kind: action
  command: "!1SPB00[CR]"
  params: []
- id: spb_set_on
  label: Speaker B On
  kind: action
  command: "!1SPB01[CR]"
  params: []
- id: spb_up
  label: Speaker B Wrap-Around Up
  kind: action
  command: "!1SPBUP[CR]"
  params: []
- id: spb_query
  label: Speaker B State Query
  kind: query
  command: "!1SPBQSTN[CR]"
  params: []

- id: mvl_set
  label: Master Volume Level (hex 00-64 = 0-100, hex 00-50 = 0-80)
  kind: action
  command: "!1MVL{level}[CR]"
  params:
    - name: level
      type: string
      description: Two-hex-digit level. Range depends on model - TX-SR805 uses 00-64 (0-100).
- id: mvl_up
  label: Master Volume Up
  kind: action
  command: "!1MVLUP[CR]"
  params: []
- id: mvl_down
  label: Master Volume Down
  kind: action
  command: "!1MVLDOWN[CR]"
  params: []
- id: mvl_query
  label: Master Volume Level Query
  kind: query
  command: "!1MVLQSTN[CR]"
  params: []

- id: slp_set
  label: Sleep Time (hex 01-5A = 1-90 min)
  kind: action
  command: "!1SLP{time}[CR]"
  params:
    - name: time
      type: string
      description: Hex minutes, 01-5A.
- id: slp_off
  label: Sleep Time Off
  kind: action
  command: "!1SLPOFF[CR]"
  params: []
- id: slp_up
  label: Sleep Time Wrap-Around Up
  kind: action
  command: "!1SLPUP[CR]"
  params: []
- id: slp_query
  label: Sleep Time Query
  kind: query
  command: "!1SLPQSTN[CR]"
  params: []

- id: slc_test
  label: Speaker Level Calibration - Test Key
  kind: action
  command: "!1SLCTEST[CR]"
  params: []
- id: slc_chsel
  label: Speaker Level Calibration - Channel Select Key
  kind: action
  command: "!1SLCCHSEL[CR]"
  params: []
- id: slc_up
  label: Speaker Level Calibration - Level Up
  kind: action
  command: "!1SLCUP[CR]"
  params: []
- id: slc_down
  label: Speaker Level Calibration - Level Down
  kind: action
  command: "!1SLCDOWN[CR]"
  params: []

- id: dif00
  label: Display Program Format
  kind: action
  command: "!1DIF00[CR]"
  params: []
- id: dif01
  label: Display Digital Input Position
  kind: action
  command: "!1DIF01[CR]"
  params: []
- id: dif02
  label: Display Digital Format Position
  kind: action
  command: "!1DIF02[CR]"
  params: []
- id: dif03
  label: Display Bass Level
  kind: action
  command: "!1DIF03[CR]"
  params: []
- id: dif04
  label: Display Treble Level
  kind: action
  command: "!1DIF04[CR]"
  params: []

- id: dif_mode_00
  label: Display Mode - Selector + Volume
  kind: action
  command: "!1DIF00[CR]"
  params: []
- id: dif_mode_01
  label: Display Mode - Selector + Listening Mode
  kind: action
  command: "!1DIF01[CR]"
  params: []
- id: dif_mode_02
  label: Display Digital Format (temporary)
  kind: action
  command: "!1DIF02[CR]"
  params: []
- id: dif_mode_03
  label: Display Video Format (temporary)
  kind: action
  command: "!1DIF03[CR]"
  params: []
- id: dif_mode_tg
  label: Display Mode Wrap-Around Up (older models use parameter "UP")
  kind: action
  command: "!1DIFTG[CR]"
  params: []
- id: dif_mode_query
  label: Display Mode Query
  kind: query
  command: "!1DIFQSTN[CR]"
  params: []

- id: dim_00
  label: Dimmer Level "Bright"
  kind: action
  command: "!1DIM00[CR]"
  params: []
- id: dim_01
  label: Dimmer Level "Dim"
  kind: action
  command: "!1DIM01[CR]"
  params: []
- id: dim_02
  label: Dimmer Level "Dark"
  kind: action
  command: "!1DIM02[CR]"
  params: []
- id: dim_03
  label: Dimmer Level "Shut-Off"
  kind: action
  command: "!1DIM03[CR]"
  params: []
- id: dim_08
  label: Dimmer Level "Bright & LED OFF"
  kind: action
  command: "!1DIM08[CR]"
  params: []
- id: dim_wrap
  label: Dimmer Level Wrap-Around Up
  kind: action
  command: "!1DIMDIM[CR]"
  params: []
- id: dim_query
  label: Dimmer Level Query
  kind: query
  command: "!1DIMQSTN[CR]"
  params: []

- id: osd_menu
  label: Setup Operation - Menu Key
  kind: action
  command: "!1OSDMENU[CR]"
  params: []
- id: osd_up
  label: Setup Operation - Up Key
  kind: action
  command: "!1OSDUP[CR]"
  params: []
- id: osd_down
  label: Setup Operation - Down Key
  kind: action
  command: "!1OSDDOWN[CR]"
  params: []
- id: osd_right
  label: Setup Operation - Right Key
  kind: action
  command: "!1OSDRIGHT[CR]"
  params: []
- id: osd_left
  label: Setup Operation - Left Key
  kind: action
  command: "!1OSDLEFT[CR]"
  params: []
- id: osd_enter
  label: Setup Operation - Enter Key
  kind: action
  command: "!1OSDENTER[CR]"
  params: []
- id: osd_exit
  label: Setup Operation - Exit Key
  kind: action
  command: "!1OSDEXIT[CR]"
  params: []

- id: mem_str
  label: Memory Store
  kind: action
  command: "!1MEMSTR[CR]"
  params: []
- id: mem_rcl
  label: Memory Recall
  kind: action
  command: "!1MEMRCL[CR]"
  params: []
- id: mem_lock
  label: Memory Lock
  kind: action
  command: "!1MEMLOCK[CR]"
  params: []
- id: mem_unlk
  label: Memory Unlock
  kind: action
  command: "!1MEMUNLK[CR]"
  params: []

- id: ifa_query
  label: Audio Information Query
  kind: query
  command: "!1IFAQSTN[CR]"
  params: []
- id: ifv_query
  label: Video Information Query
  kind: query
  command: "!1IFVQSTN[CR]"
  params: []

# ----- Unit-related (Input selectors, RECOUT, 12V trigger) -----
- id: sli_set
  label: Input Selector (main zone)
  kind: action
  command: "!1SLI{selector}[CR]"
  params:
    - name: selector
      type: string
      description: |
        Two-hex code. Supported on TX-SR805:
        00=VIDEO1, 01=VIDEO2, 02=VIDEO3/GAME-TV, 03=VIDEO4/AUX1,
        10=DVD, 20=TAPE1/TV-TAPE, 22=PHONO, 23=CD, 24=FM, 25=AM,
        26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO.
- id: sli_up
  label: Input Selector Wrap-Around Up
  kind: action
  command: "!1SLIUP[CR]"
  params: []
- id: sli_down
  label: Input Selector Wrap-Around Down
  kind: action
  command: "!1SLIDOWN[CR]"
  params: []
- id: sli_query
  label: Input Selector Position Query
  kind: query
  command: "!1SLIQSTN[CR]"
  params: []

- id: slr_set
  label: RECOUT Selector
  kind: action
  command: "!1SLR{selector}[CR]"
  params:
    - name: selector
      type: string
      description: |
        Two-hex code. 00-04 VIDEO1-5, 10=DVD, 20=TAPE1, 22=PHONO, 23=CD,
        24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO,
        30=MULTI CH, 7F=OFF, 80=SOURCE.
- id: slr_query
  label: RECOUT Selector Query
  kind: query
  command: "!1SLRQSTN[CR]"
  params: []

- id: tga_off
  label: 12V Trigger A Off
  kind: action
  command: "!1TGA00[CR]"
  params: []
- id: tga_on
  label: 12V Trigger A On
  kind: action
  command: "!1TGA01[CR]"
  params: []
- id: tgb_off
  label: 12V Trigger B Off
  kind: action
  command: "!1TGB00[CR]"
  params: []
- id: tgb_on
  label: 12V Trigger B On
  kind: action
  command: "!1TGB01[CR]"
  params: []
- id: tgc_off
  label: 12V Trigger C Off
  kind: action
  command: "!1TGC00[CR]"
  params: []
- id: tgc_on
  label: 12V Trigger C On
  kind: action
  command: "!1TGC01[CR]"
  params: []

# ----- Surround-related -----
- id: lmd_set
  label: Listening Mode
  kind: action
  command: "!1LMD{mode}[CR]"
  params:
    - name: mode
      type: string
      description: |
        Two-hex code. Supported on TX-SR805: 00=STEREO, 01=DIRECT, 02=SURROUND,
        03=GAME-RPG, 04=THX, 05=GAME-ACTION, 06=GAME-ROCK, 07=MONO MOVIE,
        08=ORCHESTRA, 09=UNPLUGGED, 0A=STUDIO-MIX, 0B=TV LOGIC, 0C=ALL CH STEREO,
        0D=THEATER-DIMENSIONAL, 0E=ENHANCED 7, 0F=MONO,
        80=PLII/PLIIx Movie, 81=PLII/PLIIx Music, 82=Neo:6 Cinema,
        83=Neo:6 Music, 84=PLII/PLIIx THX Cinema, 85=Neo:6 THX Cinema,
        86=PLII/PLIIx Game.
- id: lmd_up
  label: Listening Mode Wrap-Around Up
  kind: action
  command: "!1LMDUP[CR]"
  params: []
- id: lmd_down
  label: Listening Mode Wrap-Around Down
  kind: action
  command: "!1LMDDOWN[CR]"
  params: []
- id: lmd_query
  label: Listening Mode Query
  kind: query
  command: "!1LMDQSTN[CR]"
  params: []

- id: ltn_00
  label: Late Night Off
  kind: action
  command: "!1LTN00[CR]"
  params: []
- id: ltn_01
  label: Late Night Low (DolbyDigital) / On (TrueHD)
  kind: action
  command: "!1LTN01[CR]"
  params: []
- id: ltn_02
  label: Late Night High (DolbyDigital) / On (TrueHD)
  kind: action
  command: "!1LTN02[CR]"
  params: []
- id: ltn_up
  label: Late Night Wrap-Around Up
  kind: action
  command: "!1LTNUP[CR]"
  params: []
- id: ltn_query
  label: Late Night Level Query
  kind: query
  command: "!1LTNQSTN[CR]"
  params: []

- id: ras_re_eq_00
  label: Re-EQ Off
  kind: action
  command: "!1RAS00[CR]"
  params: []
- id: ras_re_eq_01
  label: Re-EQ On
  kind: action
  command: "!1RAS01[CR]"
  params: []
- id: ras_re_eq_up
  label: Re-EQ State Wrap-Around Up
  kind: action
  command: "!1RASUP[CR]"
  params: []
- id: ras_re_eq_query
  label: Re-EQ State Query
  kind: query
  command: "!1RASQSTN[CR]"
  params: []

# ----- Tuner-related -----
- id: tun_set
  label: Tuning Frequency (FM nnn.nn MHz / AM nnnnn kHz, 5-digit)
  kind: action
  command: "!1TUN{nnnnn}[CR]"
  params:
    - name: nnnnn
      type: string
      description: 5-digit frequency string (FM decimal point implicit).
- id: tun_up
  label: Tuning Wrap-Around Up
  kind: action
  command: "!1TUNUP[CR]"
  params: []
- id: tun_down
  label: Tuning Wrap-Around Down
  kind: action
  command: "!1TUNDOWN[CR]"
  params: []
- id: tun_query
  label: Tuning Frequency Query
  kind: query
  command: "!1TUNQSTN[CR]"
  params: []

- id: prs_set
  label: Tuner Preset (hex 01-28 = 1-40 on TX-SR805)
  kind: action
  command: "!1PRS{preset}[CR]"
  params:
    - name: preset
      type: string
      description: Two-hex-digit preset number (01-28 for TX-SR805).
- id: prs_up
  label: Tuner Preset Wrap-Around Up
  kind: action
  command: "!1PRSUP[CR]"
  params: []
- id: prs_down
  label: Tuner Preset Wrap-Around Down
  kind: action
  command: "!1PRSDOWN[CR]"
  params: []
- id: prs_query
  label: Tuner Preset Query
  kind: query
  command: "!1PRSQSTN[CR]"
  params: []

- id: prm_set
  label: Tuner Preset Memory (hex 01-28)
  kind: action
  command: "!1PRM{preset}[CR]"
  params:
    - name: preset
      type: string
      description: Two-hex-digit preset to store.

- id: rds_00
  label: RDS - Display RT Information
  kind: action
  command: "!1RDS00[CR]"
  params: []
- id: rds_01
  label: RDS - Display PTY Information
  kind: action
  command: "!1RDS01[CR]"
  params: []
- id: rds_02
  label: RDS - Display TP Information
  kind: action
  command: "!1RDS02[CR]"
  params: []
- id: rds_up
  label: RDS Information Wrap-Around Change
  kind: action
  command: "!1RDSUP[CR]"
  params: []

- id: pts_set
  label: PTY Scan (hex 00-1E = 0-30)
  kind: action
  command: "!1PTS{pty}[CR]"
  params:
    - name: pty
      type: string
      description: Two-hex PTY code 00-1E.
- id: pts_enter
  label: PTY Scan - Finish
  kind: action
  command: "!1PTSENTER[CR]"
  params: []
- id: tps_start
  label: TP Scan - Start (no parameter)
  kind: action
  command: "!1TPS[CR]"
  params: []
- id: tps_enter
  label: TP Scan - Finish
  kind: action
  command: "!1TPSENTER[CR]"
  params: []

# ----- Zone 2 -----
- id: zpw_00
  label: Zone2 Power Standby
  kind: action
  command: "!1ZPW00[CR]"
  params: []
- id: zpw_01
  label: Zone2 Power On
  kind: action
  command: "!1ZPW01[CR]"
  params: []
- id: zpw_query
  label: Zone2 Power Status Query
  kind: query
  command: "!1ZPWQSTN[CR]"
  params: []
- id: zmt_00
  label: Zone2 Muting Off
  kind: action
  command: "!1ZMT00[CR]"
  params: []
- id: zmt_01
  label: Zone2 Muting On
  kind: action
  command: "!1ZMT01[CR]"
  params: []
- id: zmt_tg
  label: Zone2 Muting Wrap-Around Toggle
  kind: action
  command: "!1ZMTTG[CR]"
  params: []
- id: zmt_query
  label: Zone2 Muting Status Query
  kind: query
  command: "!1ZMTQSTN[CR]"
  params: []
- id: zvl_set
  label: Zone2 Volume (hex 00-64 = 0-100 on TX-SR805)
  kind: action
  command: "!1ZVL{level}[CR]"
  params:
    - name: level
      type: string
      description: Two-hex-digit volume.
- id: zvl_up
  label: Zone2 Volume Up
  kind: action
  command: "!1ZVLUP[CR]"
  params: []
- id: zvl_down
  label: Zone2 Volume Down
  kind: action
  command: "!1ZVLDOWN[CR]"
  params: []
- id: zvl_query
  label: Zone2 Volume Query
  kind: query
  command: "!1ZVLQSTN[CR]"
  params: []
- id: ztn_b
  label: Zone2 Bass (xx is "-A"..."00"..."+A" = -10...0...+10, 2 step)
  kind: action
  command: "!1ZTNB{xx}[CR]"
  params:
    - name: xx
      type: string
      description: Two-char value: -A through 00 through +A in 2-step increments.
- id: ztn_t
  label: Zone2 Treble (xx is "-A"..."00"..."+A" = -10...0...+10, 2 step)
  kind: action
  command: "!1ZTNT{xx}[CR]"
  params:
    - name: xx
      type: string
      description: Two-char value: -A through 00 through +A in 2-step increments.
- id: ztn_bup
  label: Zone2 Bass Up (2 Step)
  kind: action
  command: "!1ZTNBUP[CR]"
  params: []
- id: ztn_bdown
  label: Zone2 Bass Down (2 Step)
  kind: action
  command: "!1ZTNBDOWN[CR]"
  params: []
- id: ztn_tup
  label: Zone2 Treble Up (2 Step)
  kind: action
  command: "!1ZTNTUP[CR]"
  params: []
- id: ztn_tdown
  label: Zone2 Treble Down (2 Step)
  kind: action
  command: "!1ZTNTDOWN[CR]"
  params: []
- id: ztn_query
  label: Zone2 Tone Query (returns "BxxTxx")
  kind: query
  command: "!1ZTNQSTN[CR]"
  params: []
- id: zbl_set
  label: Zone2 Balance (xx is "-A"..."00"..."+A")
  kind: action
  command: "!1ZBL{xx}[CR]"
  params:
    - name: xx
      type: string
      description: Two-char value: -A through 00 through +A.
- id: zbl_up
  label: Zone2 Balance Up (to R, 2 Step)
  kind: action
  command: "!1ZBLUP[CR]"
  params: []
- id: zbl_down
  label: Zone2 Balance Down (to L, 2 Step)
  kind: action
  command: "!1ZBLDOWN[CR]"
  params: []
- id: zbl_query
  label: Zone2 Balance Query
  kind: query
  command: "!1ZBLQSTN[CR]"
  params: []
- id: slz_set
  label: Zone2 Selector (same code map as SLI for TX-SR805)
  kind: action
  command: "!1SLZ{selector}[CR]"
  params:
    - name: selector
      type: string
      description: Two-hex selector code (00-06, 10, 20-28, 2A, 30-32, 40, 80).
- id: slz_query
  label: Zone2 Selector Position Query
  kind: query
  command: "!1SLZQSTN[CR]"
  params: []
- id: tuz_set
  label: Zone2 Tuning Frequency
  kind: action
  command: "!1TUZ{nnnnn}[CR]"
  params:
    - name: nnnnn
      type: string
      description: 5-digit frequency.
- id: tuz_up
  label: Zone2 Tuning Wrap-Around Up
  kind: action
  command: "!1TUZUP[CR]"
  params: []
- id: tuz_down
  label: Zone2 Tuning Wrap-Around Down
  kind: action
  command: "!1TUZDOWN[CR]"
  params: []
- id: tuz_query
  label: Zone2 Tuning Query
  kind: query
  command: "!1TUZQSTN[CR]"
  params: []
- id: prz_set
  label: Zone2 Preset (hex 01-28)
  kind: action
  command: "!1PRZ{preset}[CR]"
  params:
    - name: preset
      type: string
      description: Two-hex-digit preset.
- id: prz_up
  label: Zone2 Preset Wrap-Around Up
  kind: action
  command: "!1PRZUP[CR]"
  params: []
- id: prz_down
  label: Zone2 Preset Wrap-Around Down
  kind: action
  command: "!1PRZDOWN[CR]"
  params: []
- id: prz_query
  label: Zone2 Preset Query
  kind: query
  command: "!1PRZQSTN[CR]"
  params: []
- id: lmz_00
  label: Zone2 Listening Mode - STEREO
  kind: action
  command: "!1LMZ00[CR]"
  params: []
- id: lmz_01
  label: Zone2 Listening Mode - DIRECT
  kind: action
  command: "!1LMZ01[CR]"
  params: []
- id: lmz_0f
  label: Zone2 Listening Mode - MONO
  kind: action
  command: "!1LMZ0F[CR]"
  params: []
- id: lmz_12
  label: Zone2 Listening Mode - MULTIPLEX
  kind: action
  command: "!1LMZ12[CR]"
  params: []
- id: lmz_87
  label: Zone2 Listening Mode - DVS (PL2)
  kind: action
  command: "!1LMZ87[CR]"
  params: []
- id: lmz_88
  label: Zone2 Listening Mode - DVS (NEO6)
  kind: action
  command: "!1LMZ88[CR]"
  params: []
- id: ltz_00
  label: Zone2 Late Night Off
  kind: action
  command: "!1LTZ00[CR]"
  params: []
- id: ltz_01
  label: Zone2 Late Night Low
  kind: action
  command: "!1LTZ01[CR]"
  params: []
- id: ltz_02
  label: Zone2 Late Night High
  kind: action
  command: "!1LTZ02[CR]"
  params: []
- id: ltz_up
  label: Zone2 Late Night Wrap-Around Up
  kind: action
  command: "!1LTZUP[CR]"
  params: []
- id: ltz_query
  label: Zone2 Late Night Level Query
  kind: query
  command: "!1LTZQSTN[CR]"
  params: []
- id: raz_00
  label: Zone2 Re-EQ/Academy Both Off
  kind: action
  command: "!1RAZ00[CR]"
  params: []
- id: raz_01
  label: Zone2 Re-EQ On
  kind: action
  command: "!1RAZ01[CR]"
  params: []
- id: raz_02
  label: Zone2 Academy On
  kind: action
  command: "!1RAZ02[CR]"
  params: []
- id: raz_up
  label: Zone2 Re-EQ/Academy Wrap-Around Up
  kind: action
  command: "!1RAZUP[CR]"
  params: []
- id: raz_query
  label: Zone2 Re-EQ/Academy State Query
  kind: query
  command: "!1RAZQSTN[CR]"
  params: []

# ----- Zone 3 -----
- id: pw3_00
  label: Zone3 Power Standby
  kind: action
  command: "!1PW300[CR]"
  params: []
- id: pw3_01
  label: Zone3 Power On
  kind: action
  command: "!1PW301[CR]"
  params: []
- id: pw3_query
  label: Zone3 Power Status Query
  kind: query
  command: "!1PW3QSTN[CR]"
  params: []
- id: mt3_00
  label: Zone3 Muting Off
  kind: action
  command: "!1MT300[CR]"
  params: []
- id: mt3_01
  label: Zone3 Muting On
  kind: action
  command: "!1MT301[CR]"
  params: []
- id: mt3_tg
  label: Zone3 Muting Wrap-Around Toggle
  kind: action
  command: "!1MT3TG[CR]"
  params: []
- id: mt3_query
  label: Zone3 Muting Status Query
  kind: query
  command: "!1MT3QSTN[CR]"
  params: []
- id: vl3_set
  label: Zone3 Volume (hex 00-64 = 0-100)
  kind: action
  command: "!1VL3{level}[CR]"
  params:
    - name: level
      type: string
      description: Two-hex-digit volume.
- id: vl3_up
  label: Zone3 Volume Up
  kind: action
  command: "!1VL3UP[CR]"
  params: []
- id: vl3_down
  label: Zone3 Volume Down
  kind: action
  command: "!1VL3DOWN[CR]"
  params: []
- id: vl3_query
  label: Zone3 Volume Query
  kind: query
  command: "!1VL3QSTN[CR]"
  params: []
- id: tn3_b
  label: Zone3 Bass
  kind: action
  command: "!1TN3B{xx}[CR]"
  params:
    - name: xx
      type: string
      description: Two-char value -A..+A.
- id: tn3_t
  label: Zone3 Treble
  kind: action
  command: "!1TN3T{xx}[CR]"
  params:
    - name: xx
      type: string
      description: Two-char value -A..+A.
- id: tn3_bup
  label: Zone3 Bass Up
  kind: action
  command: "!1TN3BUP[CR]"
  params: []
- id: tn3_bdown
  label: Zone3 Bass Down
  kind: action
  command: "!1TN3BDOWN[CR]"
  params: []
- id: tn3_tup
  label: Zone3 Treble Up
  kind: action
  command: "!1TN3TUP[CR]"
  params: []
- id: tn3_tdown
  label: Zone3 Treble Down
  kind: action
  command: "!1TN3TDOWN[CR]"
  params: []
- id: tn3_query
  label: Zone3 Tone Query
  kind: query
  command: "!1TN3QSTN[CR]"
  params: []
- id: bl3_set
  label: Zone3 Balance
  kind: action
  command: "!1BL3{xx}[CR]"
  params:
    - name: xx
      type: string
      description: Two-char value -A..+A.
- id: bl3_up
  label: Zone3 Balance Up
  kind: action
  command: "!1BL3UP[CR]"
  params: []
- id: bl3_down
  label: Zone3 Balance Down
  kind: action
  command: "!1BL3DOWN[CR]"
  params: []
- id: bl3_query
  label: Zone3 Balance Query
  kind: query
  command: "!1BL3QSTN[CR]"
  params: []
- id: sl3_set
  label: Zone3 Selector
  kind: action
  command: "!1SL3{selector}[CR]"
  params:
    - name: selector
      type: string
      description: Two-hex selector code.
- id: sl3_query
  label: Zone3 Selector Position Query
  kind: query
  command: "!1SL3QSTN[CR]"
  params: []
- id: tu3_set
  label: Zone3 Tuning Frequency
  kind: action
  command: "!1TU3{nnnnn}[CR]"
  params:
    - name: nnnnn
      type: string
      description: 5-digit frequency.
- id: tu3_up
  label: Zone3 Tuning Wrap-Around Up
  kind: action
  command: "!1TU3UP[CR]"
  params: []
- id: tu3_down
  label: Zone3 Tuning Wrap-Around Down
  kind: action
  command: "!1TU3DOWN[CR]"
  params: []
- id: tu3_query
  label: Zone3 Tuning Query
  kind: query
  command: "!1TU3QSTN[CR]"
  params: []
- id: pr3_set
  label: Zone3 Preset (hex 01-28)
  kind: action
  command: "!1PR3{preset}[CR]"
  params:
    - name: preset
      type: string
      description: Two-hex-digit preset.
- id: pr3_up
  label: Zone3 Preset Wrap-Around Up
  kind: action
  command: "!1PR3UP[CR]"
  params: []
- id: pr3_down
  label: Zone3 Preset Wrap-Around Down
  kind: action
  command: "!1PR3DOWN[CR]"
  params: []
- id: pr3_query
  label: Zone3 Preset Query
  kind: query
  command: "!1PR3QSTN[CR]"
  params: []

# ----- Zone 4 -----
- id: pw4_00
  label: Zone4 Power Standby
  kind: action
  command: "!1PW400[CR]"
  params: []
- id: pw4_01
  label: Zone4 Power On
  kind: action
  command: "!1PW401[CR]"
  params: []
- id: pw4_query
  label: Zone4 Power Status Query
  kind: query
  command: "!1PW4QSTN[CR]"
  params: []
- id: mt4_00
  label: Zone4 Muting Off
  kind: action
  command: "!1MT400[CR]"
  params: []
- id: mt4_01
  label: Zone4 Muting On
  kind: action
  command: "!1MT401[CR]"
  params: []
- id: mt4_tg
  label: Zone4 Muting Wrap-Around Toggle
  kind: action
  command: "!1MT4TG[CR]"
  params: []
- id: mt4_query
  label: Zone4 Muting Status Query
  kind: query
  command: "!1MT4QSTN[CR]"
  params: []
- id: vl4_set
  label: Zone4 Volume (hex 00-64 = 0-100)
  kind: action
  command: "!1VL4{level}[CR]"
  params:
    - name: level
      type: string
      description: Two-hex-digit volume.
- id: vl4_up
  label: Zone4 Volume Up
  kind: action
  command: "!1VL4UP[CR]"
  params: []
- id: vl4_down
  label: Zone4 Volume Down
  kind: action
  command: "!1VL4DOWN[CR]"
  params: []
- id: vl4_query
  label: Zone4 Volume Query
  kind: query
  command: "!1VL4QSTN[CR]"
  params: []
- id: sl4_set
  label: Zone4 Selector
  kind: action
  command: "!1SL4{selector}[CR]"
  params:
    - name: selector
      type: string
      description: Two-hex selector code.
- id: sl4_query
  label: Zone4 Selector Position Query
  kind: query
  command: "!1SL4QSTN[CR]"
  params: []
- id: tu4_set
  label: Zone4 Tuning Frequency
  kind: action
  command: "!1TU4{nnnnn}[CR]"
  params:
    - name: nnnnn
      type: string
      description: 5-digit frequency.
- id: tu4_up
  label: Zone4 Tuning Wrap-Around Up
  kind: action
  command: "!1TU4UP[CR]"
  params: []
- id: tu4_down
  label: Zone4 Tuning Wrap-Around Down
  kind: action
  command: "!1TU4DOWN[CR]"
  params: []
- id: tu4_query
  label: Zone4 Tuning Query
  kind: query
  command: "!1TU4QSTN[CR]"
  params: []
- id: pr4_set
  label: Zone4 Preset (hex 01-28)
  kind: action
  command: "!1PR4{preset}[CR]"
  params:
    - name: preset
      type: string
      description: Two-hex-digit preset.
- id: pr4_up
  label: Zone4 Preset Wrap-Around Up
  kind: action
  command: "!1PR4UP[CR]"
  params: []
- id: pr4_down
  label: Zone4 Preset Wrap-Around Down
  kind: action
  command: "!1PR4DOWN[CR]"
  params: []
- id: pr4_query
  label: Zone4 Preset Query
  kind: query
  command: "!1PR4QSTN[CR]"
  params: []

# ----- CD Player transport (RI) -----
- id: ccd_track
  label: CD - TRACK+
  kind: action
  command: "!1CCDTRACK[CR]"
  params: []
- id: ccd_play
  label: CD - PLAY
  kind: action
  command: "!1CCDPLAY[CR]"
  params: []
- id: ccd_stop
  label: CD - STOP
  kind: action
  command: "!1CCDSTOP[CR]"
  params: []
- id: ccd_pause
  label: CD - PAUSE
  kind: action
  command: "!1CCDPAUSE[CR]"
  params: []
- id: ccd_skip_f
  label: CD - SKIP.F (next track)
  kind: action
  command: "!1CCDSKIP.F[CR]"
  params: []
- id: ccd_skip_r
  label: CD - SKIP.R (prev track)
  kind: action
  command: "!1CCDSKIP.R[CR]"
  params: []
- id: ccd_memory
  label: CD - MEMORY
  kind: action
  command: "!1CCDMEMORY[CR]"
  params: []
- id: ccd_clear
  label: CD - CLEAR
  kind: action
  command: "!1CCDCLEAR[CR]"
  params: []
- id: ccd_repeat
  label: CD - REPEAT
  kind: action
  command: "!1CCDREPEAT[CR]"
  params: []
- id: ccd_random
  label: CD - RANDOM
  kind: action
  command: "!1CCDRANDOM[CR]"
  params: []
- id: ccd_disp
  label: CD - DISPLAY
  kind: action
  command: "!1CCDDISP[CR]"
  params: []
- id: ccd_opcl
  label: CD - OPEN/CLOSE
  kind: action
  command: "!1CCDOP/CL[CR]"
  params: []
- id: ccd_0
  label: CD - 0
  kind: action
  command: "!1CCD0[CR]"
  params: []
- id: ccd_1
  label: CD - 1
  kind: action
  command: "!1CCD1[CR]"
  params: []
- id: ccd_2
  label: CD - 2
  kind: action
  command: "!1CCD2[CR]"
  params: []
- id: ccd_3
  label: CD - 3
  kind: action
  command: "!1CCD3[CR]"
  params: []
- id: ccd_4
  label: CD - 4
  kind: action
  command: "!1CCD4[CR]"
  params: []
- id: ccd_5
  label: CD - 5
  kind: action
  command: "!1CCD5[CR]"
  params: []
- id: ccd_6
  label: CD - 6
  kind: action
  command: "!1CCD6[CR]"
  params: []
- id: ccd_7
  label: CD - 7
  kind: action
  command: "!1CCD7[CR]"
  params: []
- id: ccd_8
  label: CD - 8
  kind: action
  command: "!1CCD8[CR]"
  params: []
- id: ccd_9
  label: CD - 9
  kind: action
  command: "!1CCD9[CR]"
  params: []

# ----- TAPE1(A) transport (RI) -----
- id: ct1_play_f
  label: TAPE1 - PLAY Forward
  kind: action
  command: "!1CT1PLAY.F[CR]"
  params: []
- id: ct1_play_r
  label: TAPE1 - PLAY Reverse
  kind: action
  command: "!1CT1PLAY.R[CR]"
  params: []
- id: ct1_stop
  label: TAPE1 - STOP
  kind: action
  command: "!1CT1STOP[CR]"
  params: []
- id: ct1_rcpau
  label: TAPE1 - REC/PAUSE
  kind: action
  command: "!1CT1RC/PAU[CR]"
  params: []
- id: ct1_ff
  label: TAPE1 - FF
  kind: action
  command: "!1CT1FF[CR]"
  params: []
- id: ct1_rew
  label: TAPE1 - REW
  kind: action
  command: "!1CT1REW[CR]"
  params: []

# ----- TAPE2(B) transport (RI) -----
- id: ct2_play_f
  label: TAPE2 - PLAY Forward
  kind: action
  command: "!1CT2PLAY.F[CR]"
  params: []
- id: ct2_play_r
  label: TAPE2 - PLAY Reverse
  kind: action
  command: "!1CT2PLAY.R[CR]"
  params: []
- id: ct2_stop
  label: TAPE2 - STOP
  kind: action
  command: "!1CT2STOP[CR]"
  params: []
- id: ct2_rcpau
  label: TAPE2 - REC/PAUSE
  kind: action
  command: "!1CT2RC/PAU[CR]"
  params: []
- id: ct2_ff
  label: TAPE2 - FF
  kind: action
  command: "!1CT2FF[CR]"
  params: []
- id: ct2_rew
  label: TAPE2 - REW
  kind: action
  command: "!1CT2REW[CR]"
  params: []
- id: ct2_opcl
  label: TAPE2 - OPEN/CLOSE
  kind: action
  command: "!1CT2OP/CL[CR]"
  params: []
- id: ct2_skip_f
  label: TAPE2 - SKIP.F
  kind: action
  command: "!1CT2SKIP.F[CR]"
  params: []
- id: ct2_skip_r
  label: TAPE2 - SKIP.R
  kind: action
  command: "!1CT2SKIP.R[CR]"
  params: []
- id: ct2_rec
  label: TAPE2 - REC
  kind: action
  command: "!1CT2REC[CR]"
  params: []

# ----- Dock via RI -----
- id: cds_pwron
  label: Dock - Power On
  kind: action
  command: "!1CDSPWRON[CR]"
  params: []
- id: cds_pwroff
  label: Dock - Power Off
  kind: action
  command: "!1CDSPWROFF[CR]"
  params: []
- id: cds_ply_res
  label: Dock - PLAY/RESUME
  kind: action
  command: "!1CDSPLY/RES[CR]"
  params: []
- id: cds_stop
  label: Dock - STOP
  kind: action
  command: "!1CDSSTOP[CR]"
  params: []
- id: cds_skip_f
  label: Dock - Track Up
  kind: action
  command: "!1CDSSKIP.F[CR]"
  params: []
- id: cds_skip_r
  label: Dock - Track Down
  kind: action
  command: "!1CDSSKIP.R[CR]"
  params: []
- id: cds_pause
  label: Dock - PAUSE
  kind: action
  command: "!1CDSPAUSE[CR]"
  params: []
- id: cds_plypau
  label: Dock - PLAY/PAUSE
  kind: action
  command: "!1CDSPLY/PAU[CR]"
  params: []
- id: cds_ff
  label: Dock - FF
  kind: action
  command: "!1CDSFF[CR]"
  params: []
- id: cds_rew
  label: Dock - FR
  kind: action
  command: "!1CDSREW[CR]"
  params: []
- id: cds_album_up
  label: Dock - Album Up
  kind: action
  command: "!1CDSALBUM+[CR]"
  params: []
- id: cds_album_dn
  label: Dock - Album Down
  kind: action
  command: "!1CDSALBUM-[CR]"
  params: []
- id: cds_plist_up
  label: Dock - Playlist Up
  kind: action
  command: "!1CDSPLIST+[CR]"
  params: []
- id: cds_plist_dn
  label: Dock - Playlist Down
  kind: action
  command: "!1CDSPLIST-[CR]"
  params: []
- id: cds_chapt_up
  label: Dock - Chapter Up
  kind: action
  command: "!1CDSCHAPT+[CR]"
  params: []
- id: cds_chapt_dn
  label: Dock - Chapter Down
  kind: action
  command: "!1CDSCHAPT-[CR]"
  params: []
- id: cds_random
  label: Dock - Shuffle
  kind: action
  command: "!1CDSRANDOM[CR]"
  params: []
- id: cds_repeat
  label: Dock - Repeat
  kind: action
  command: "!1CDSREPEAT[CR]"
  params: []
- id: cds_mute
  label: Dock - Mute
  kind: action
  command: "!1CDSMUTE[CR]"
  params: []
- id: cds_blight
  label: Dock - Backlight
  kind: action
  command: "!1CDSBLIGHT[CR]"
  params: []
- id: cds_menu
  label: Dock - Menu
  kind: action
  command: "!1CDSMENU[CR]"
  params: []
- id: cds_enter
  label: Dock - Select
  kind: action
  command: "!1CDSENTER[CR]"
  params: []
- id: cds_up
  label: Dock - Cursor Up
  kind: action
  command: "!1CDSUP[CR]"
  params: []
- id: cds_down
  label: Dock - Cursor Down
  kind: action
  command: "!1CDSDOWN[CR]"
  params: []

# ----- Additional source-documented command surface -----
# The additions below retain the source's literal three-character command
# tokens in command fields. Parameters are appended to these tokens before
# applying the ISCP framing documented above. The source prints command and
# parameter separately; it does not print assembled framed strings for these
# additions. These entries record catalogue coverage, not TX-SR805 support.
# The supplied main-zone support tables do not include a TX-SR805 column;
# applicability of these additional main-zone commands is UNRESOLVED.

- id: spl_set
  label: Speaker Layout
  kind: action
  command: "SPL"
  params:
    - name: layout
      type: string
      description: |
        "SB" sets SurrBack Speaker
        "FH" sets Front High Speaker / SurrBack+Front High Speakers
        "FW" sets Front Wide Speaker / SurrBack+Front Wide Speakers
- id: spl_up
  label: Speaker Layout Wrap-Around Up
  kind: action
  command: "SPL"
  params:
    - name: parameter
      type: string
      description: '"UP"'
- id: spl_query
  label: Speaker Layout State Query
  kind: query
  command: "SPL"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'

- id: mvl_step
  label: Master Volume One Decibel Step
  kind: action
  command: "MVL"
  params:
    - name: parameter
      type: string
      description: |
        "UP1" sets Volume Level Up 1dB Step
        "DOWN1" sets Volume Level Down 1dB Step

- id: tfr_set
  label: Front Tone
  kind: action
  command: "TFR"
  params:
    - name: parameter
      type: string
      description: |
        "Bxx" Front Bass (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "Txx" Front Treble (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP" sets Front Bass up(2 step)
        "BDOWN" sets Front Bass down(2 step)
        "TUP" sets Front Treble up(2 step)
        "TDOWN" sets Front Treble down(2 step)
- id: tfr_query
  label: Front Tone Query
  kind: query
  command: "TFR"
  params:
    - name: parameter
      type: string
      description: '"QSTN" gets Front Tone ("BxxTxx")'
- id: tfw_set
  label: Front Wide Tone
  kind: action
  command: "TFW"
  params:
    - name: parameter
      type: string
      description: |
        "Bxx" Front Wide Bass (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "Txx" Front Wide Treble (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP" sets Front Wide Bass up(2 step)
        "BDOWN" sets Front Wide Bass down(2 step)
        "TUP" sets Front Wide Treble up(2 step)
        "TDOWN" sets Front Wide Treble down(2 step)
- id: tfw_query
  label: Front Wide Tone Query
  kind: query
  command: "TFW"
  params:
    - name: parameter
      type: string
      description: '"QSTN" gets Front Wide Tone ("BxxTxx")'
- id: tfh_set
  label: Front High Tone
  kind: action
  command: "TFH"
  params:
    - name: parameter
      type: string
      description: |
        "Bxx" Front High Bass (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "Txx" Front High Treble (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP" sets Front High Bass up(2 step)
        "BDOWN" sets Front High Bass down(2 step)
        "TUP" sets Front High Treble up(2 step)
        "TDOWN" sets Front High Treble down(2 step)
- id: tfh_query
  label: Front High Tone Query
  kind: query
  command: "TFH"
  params:
    - name: parameter
      type: string
      description: '"QSTN" gets Front High Tone ("BxxTxx")'
- id: tct_set
  label: Center Tone
  kind: action
  command: "TCT"
  params:
    - name: parameter
      type: string
      description: |
        "Bxx" Center Bass (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "Txx" Center Treble (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP" sets Center Bass up(2 step)
        "BDOWN" sets Center Bass down(2 step)
        "TUP" sets Center Treble up(2 step)
        "TDOWN" sets Center Treble down(2 step)
- id: tct_query
  label: Center Tone Query
  kind: query
  command: "TCT"
  params:
    - name: parameter
      type: string
      description: '"QSTN" gets Cetner Tone ("BxxTxx")'
- id: tsr_set
  label: Surround Tone
  kind: action
  command: "TSR"
  params:
    - name: parameter
      type: string
      description: |
        "Bxx" Surround Bass (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "Txx" Surround Treble (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP" sets Surround Bass up(2 step)
        "BDOWN" sets Surround Bass down(2 step)
        "TUP" sets Surround Treble up(2 step)
        "TDOWN" sets Surround Treble down(2 step)
- id: tsr_query
  label: Surround Tone Query
  kind: query
  command: "TSR"
  params:
    - name: parameter
      type: string
      description: '"QSTN" gets Surround Tone ("BxxTxx")'
- id: tsb_set
  label: Surround Back Tone
  kind: action
  command: "TSB"
  params:
    - name: parameter
      type: string
      description: |
        "Bxx" Surround Back Bass (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "Txx" Surround Back Treble (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP" sets Surround Back Bass up(2 step)
        "BDOWN" sets Surround Back Bass down(2 step)
        "TUP" sets Surround Back Treble up(2 step)
        "TDOWN" sets Surround Back Treble down(2 step)
- id: tsb_query
  label: Surround Back Tone Query
  kind: query
  command: "TSB"
  params:
    - name: parameter
      type: string
      description: '"QSTN" gets Surround Back Tone ("BxxTxx")'
- id: tsw_set
  label: Subwoofer Tone
  kind: action
  command: "TSW"
  params:
    - name: parameter
      type: string
      description: |
        "Bxx" Subwoofer Bass (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP" sets Subwoofer Bass up(2 step)
        "BDOWN" sets Subwoofer Bass down(2 step)
- id: tsw_query
  label: Subwoofer Tone Query
  kind: query
  command: "TSW"
  params:
    - name: parameter
      type: string
      description: '"QSTN" gets Subwoofer Tone ("BxxTxx")'

- id: swl_set
  label: Temporary Subwoofer Level
  kind: action
  command: "SWL"
  params:
    - name: level
      type: string
      description: '"-F"-"00"-"+C" sets Subwoofer Level-15dB-0dB-+12dB'
- id: swl_step
  label: Temporary Subwoofer Level Step
  kind: action
  command: "SWL"
  params:
    - name: parameter
      type: string
      description: |
        "UP" LEVEL + Key
        "DOWN" LEVEL–KEY
- id: swl_query
  label: Temporary Subwoofer Level Query
  kind: query
  command: "SWL"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: ctl_set
  label: Temporary Center Level
  kind: action
  command: "CTL"
  params:
    - name: level
      type: string
      description: '"-C"-"00"-"+C" sets Center Level-12dB-0dB-+12dB'
- id: ctl_step
  label: Temporary Center Level Step
  kind: action
  command: "CTL"
  params:
    - name: parameter
      type: string
      description: |
        "UP" LEVEL + Key
        "DOWN" LEVEL–KEY
- id: ctl_query
  label: Temporary Center Level Query
  kind: query
  command: "CTL"
  params:
    - name: parameter
      type: string
      description: '"QSTN"; source describes this row as gets the Subwoofer Level.'

- id: dif_mode_up
  label: Older Display Mode Wrap-Around Up
  kind: action
  command: "DIF"
  params:
    - name: parameter
      type: string
      description: '"UP"; source footnote identifies this parameter for older models.'
- id: osd_adjust
  label: Setup Audio Or Video Adjust
  kind: action
  command: "OSD"
  params:
    - name: parameter
      type: string
      description: |
        "AUDIO" Audio Adjust Key
        "VIDEO" Video Adjust Key

- id: sla_set
  label: Audio Selector
  kind: action
  command: "SLA"
  params:
    - name: selector
      type: string
      description: |
        "00" sets AUTO
        "01" sets MULTI-CHANNEL
        "02" sets ANALOG
        "03" sets iLINK
        "04" sets HDMI
        "05" sets COAX/OPT
        "06" sets BALANCE
- id: sla_up
  label: Audio Selector Wrap-Around Up
  kind: action
  command: "SLA"
  params:
    - name: parameter
      type: string
      description: '"UP"'
- id: sla_query
  label: Audio Selector Status Query
  kind: query
  command: "SLA"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: vos_set
  label: Japanese Video Output Selector
  kind: action
  command: "VOS"
  params:
    - name: selector
      type: string
      description: |
        "00" sets D4
        "01" sets Component
- id: vos_query
  label: Japanese Video Output Selector Query
  kind: query
  command: "VOS"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: hdo_set
  label: HDMI Output Selector
  kind: action
  command: "HDO"
  params:
    - name: selector
      type: string
      description: |
        "00" sets No                         Analog
        "01" sets Yes/Out Main        HDMI Main
        "02" sets Out Sub                HDMI Sub
        "03" sets                              Both
        "04" sets                              Both(Main)
        "05" sets                              Both(Sub)
- id: hdo_up
  label: HDMI Output Selector Wrap-Around Up
  kind: action
  command: "HDO"
  params:
    - name: parameter
      type: string
      description: '"UP"'
- id: hdo_query
  label: HDMI Output Selector Query
  kind: query
  command: "HDO"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: res_set
  label: Monitor Output Resolution
  kind: action
  command: "RES"
  params:
    - name: resolution
      type: string
      description: |
        "00" sets Through
        "01" sets Auto(HDMI Output Only)
        "02" sets 480p
        "03" sets 720p
        "04" sets 1080i
        "05" sets 1080p(HDMI Output Only)
        "07" sets 1080p/24fs(HDMI Output Only)
        "06" sets Source
- id: res_up
  label: Monitor Output Resolution Wrap-Around Up
  kind: action
  command: "RES"
  params:
    - name: parameter
      type: string
      description: '"UP"'
- id: res_query
  label: Monitor Output Resolution Query
  kind: query
  command: "RES"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: isf_set
  label: ISF Mode
  kind: action
  command: "ISF"
  params:
    - name: mode
      type: string
      description: |
        "00" sets ISF Mode Custom
        "01" sets ISF Mode Day
        "02" sets ISF Mode Night
- id: isf_up
  label: ISF Mode Wrap-Around Up
  kind: action
  command: "ISF"
  params:
    - name: parameter
      type: string
      description: '"UP"'
- id: isf_query
  label: ISF Mode State Query
  kind: query
  command: "ISF"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'

- id: lmd_category
  label: Listening Mode Category Wrap-Around Up
  kind: action
  command: "LMD"
  params:
    - name: parameter
      type: string
      description: |
        "MOVIE" sets Listening Mode Wrap-Around Up
        "MUSIC" sets Listening Mode Wrap-Around Up
        "GAME" sets Listening Mode Wrap-Around Up
- id: ltn_03
  label: Late Night Auto For Dolby TrueHD
  kind: action
  command: "LTN"
  params:
    - name: parameter
      type: string
      description: '"03" sets Late Night Auto@Dolby TrueHD'
- id: ras_academy_02
  label: Academy Filter On
  kind: action
  command: "RAS"
  params:
    - name: parameter
      type: string
      description: '"02" sets Academy On'
- id: ady_set
  label: Audyssey Equalization
  kind: action
  command: "ADY"
  params:
    - name: state
      type: string
      description: |
        "00" sets Audyssey 2EQ/MultEQ/MultEQ XT Off
        "01" sets Audyssey 2EQ/MultEQ/MultEQ XT On
- id: ady_up
  label: Audyssey Equalization Wrap-Around Up
  kind: action
  command: "ADY"
  params:
    - name: parameter
      type: string
      description: '"UP"'
- id: ady_query
  label: Audyssey Equalization State Query
  kind: query
  command: "ADY"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: adq_set
  label: Audyssey Dynamic EQ
  kind: action
  command: "ADQ"
  params:
    - name: state
      type: string
      description: |
        "00" sets Audyssey Dynamic EQ Off
        "01" sets Audyssey Dynamic EQ On
- id: adq_up
  label: Audyssey Dynamic EQ Wrap-Around Up
  kind: action
  command: "ADQ"
  params:
    - name: parameter
      type: string
      description: '"UP"'
- id: adq_query
  label: Audyssey Dynamic EQ State Query
  kind: query
  command: "ADQ"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: adv_set
  label: Audyssey Dynamic Volume
  kind: action
  command: "ADV"
  params:
    - name: level
      type: string
      description: |
        "00" sets Audyssey Dynamic Volume Off
        "01" sets Audyssey Dynamic Volume Light
        "02" sets Audyssey Dynamic Volume Medium
        "03" sets Audyssey Dynamic Volume Heavy
- id: adv_up
  label: Audyssey Dynamic Volume Wrap-Around Up
  kind: action
  command: "ADV"
  params:
    - name: parameter
      type: string
      description: '"UP"'
- id: adv_query
  label: Audyssey Dynamic Volume State Query
  kind: query
  command: "ADV"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: dvl_set
  label: Dolby Volume
  kind: action
  command: "DVL"
  params:
    - name: level
      type: string
      description: |
        "00" sets Dolby Volume Off
        "01" sets Dolby Volume Low
        "02" sets Dolby Volume Mid
        "03" sets Dolby Volume High
- id: dvl_up
  label: Dolby Volume Wrap-Around Up
  kind: action
  command: "DVL"
  params:
    - name: parameter
      type: string
      description: '"UP"'
- id: dvl_query
  label: Dolby Volume State Query
  kind: query
  command: "DVL"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: mot_set
  label: Music Optimizer
  kind: action
  command: "MOT"
  params:
    - name: state
      type: string
      description: |
        "00" sets Music Optimizer Off
        "01" sets Music Optimizer On
- id: mot_up
  label: Music Optimizer Wrap-Around Up
  kind: action
  command: "MOT"
  params:
    - name: parameter
      type: string
      description: '"UP"'
- id: mot_query
  label: Music Optimizer State Query
  kind: query
  command: "MOT"
  params:
    - name: parameter
      type: string
      description: '"QSTN"; source describes this row as gets The Dolby Volume State.'

- id: xcn_query
  label: XM Channel Name Query
  kind: query
  command: "XCN"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: xat_query
  label: XM Artist Name Query
  kind: query
  command: "XAT"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: xti_query
  label: XM Title Query
  kind: query
  command: "XTI"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: xch_set
  label: XM Channel Number
  kind: action
  command: "XCH"
  params:
    - name: channel
      type: string
      description: '"000"-"255" XM Channel Number"000-255"'
- id: xch_step
  label: XM Channel Wrap-Around Step
  kind: action
  command: "XCH"
  params:
    - name: parameter
      type: string
      description: |
        "UP" sets XM Channel Wrap-Around Up
        "DOWN" sets XM Channel Wrap-Around Down
- id: xch_query
  label: XM Channel Number Query
  kind: query
  command: "XCH"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: xct_step
  label: XM Category Wrap-Around Step
  kind: action
  command: "XCT"
  params:
    - name: parameter
      type: string
      description: |
        "UP" sets XM Category Wrap-Around Up
        "DOWN" sets XM Category Wrap-Around Down
- id: xct_query
  label: XM Category Query
  kind: query
  command: "XCT"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: scn_query
  label: SIRIUS Channel Name Query
  kind: query
  command: "SCN"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: sat_query
  label: SIRIUS Artist Name Query
  kind: query
  command: "SAT"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: sti_query
  label: SIRIUS Title Query
  kind: query
  command: "STI"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: sch_set
  label: SIRIUS Channel Number
  kind: action
  command: "SCH"
  params:
    - name: channel
      type: string
      description: '"000"-"255" SIRIUS Channel Number"000-255"'
- id: sch_step
  label: SIRIUS Channel Wrap-Around Step
  kind: action
  command: "SCH"
  params:
    - name: parameter
      type: string
      description: |
        "UP" sets SIRIUS Channel Wrap-Around Up
        "DOWN" sets SIRIUS Channel Wrap-Around Down
- id: sch_query
  label: SIRIUS Channel Number Query
  kind: query
  command: "SCH"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: sct_step
  label: SIRIUS Category Wrap-Around Step
  kind: action
  command: "SCT"
  params:
    - name: parameter
      type: string
      description: |
        "UP" sets SIRIUS Category Wrap-Around Up
        "DOWN" sets SIRIUS Category Wrap-Around Down
- id: sct_query
  label: SIRIUS Category Query
  kind: query
  command: "SCT"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: slk_password
  label: SIRIUS Parental Lock Password
  kind: action
  command: "SLK"
  params:
    - name: password
      type: string
      description: '"nnnn" Lock Password (4Digits)'

- id: hat_query
  label: HD Radio Artist Name Query
  kind: query
  command: "HAT"
  params:
    - name: parameter
      type: string
      description: '"QSTN"; HD Radio Artist Name (variable-length, 64 digits max)'
- id: hcn_query
  label: HD Radio Channel Name Query
  kind: query
  command: "HCN"
  params:
    - name: parameter
      type: string
      description: '"QSTN"; HD Radio Channel Name (Station Name) (7 digits)'
- id: hti_query
  label: HD Radio Title Query
  kind: query
  command: "HTI"
  params:
    - name: parameter
      type: string
      description: '"QSTN"; HD Radio Title (variable-length, 64 digits max)'
- id: hds_query
  label: HD Radio Detail Query
  kind: query
  command: "HDS"
  params:
    - name: parameter
      type: string
      description: '"QSTN" gets HD Radio Title'
- id: hpr_set
  label: HD Radio Channel Program
  kind: action
  command: "HPR"
  params:
    - name: program
      type: string
      description: '"01"-"08" sets directly HD Radio Channel Program'
- id: hpr_query
  label: HD Radio Channel Program Query
  kind: query
  command: "HPR"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: hbl_set
  label: HD Radio Blend Mode
  kind: action
  command: "HBL"
  params:
    - name: mode
      type: string
      description: |
        "00" sets HD Radio Blend Mode"Auto"
        "01" sets HD Radio Blend Mode"Analog"
- id: hbl_query
  label: HD Radio Blend Mode Status Query
  kind: query
  command: "HBL"
  params:
    - name: parameter
      type: string
      description: '"QSTN"'
- id: hts_query
  label: HD Radio Tuner Status Query
  kind: query
  command: "HTS"
  params:
    - name: parameter
      type: string
      description: |
        "QSTN" gets the HD Radio Tuner Status
        Response "mmnnoo": HD Radio Tuner Status (3 bytes)
        mm -> "00" not HD, "01" HD
        nn -> current Program "01"-"08"
        oo -> receivable Program (8 bits are represented in hexadecimal
        notation. Each bit shows receivable or not.)

- id: ntc_operation
  label: Network Or USB Operation
  kind: action
  command: "NTC"
  params:
    - name: operation
      type: string
      description: |
        Documented operation tokens:
        "PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "FF", "REW",
        "REPEAT", "RANDOM", "DISPLAY", "ALBUM", "ARTIST", "GENRE",
        "PLAYLIST", "RIGHT", "LEFT", "UP", "DOWN", "SELECT",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "DELETE", "CAPS", "LOCATION", "LANGUAGE", "SETUP", "RETURN",
        "CHUP", "CHDN".
        CH UP(for iRadio); CH DOWN(for iRadio).
        FFW/REW Net-tune commands must be sent continuously, with no more than 100ms delay between codes.
- id: nat_query
  label: Network Or USB Artist Name Query
  kind: query
  command: "NAT"
  params:
    - name: parameter
      type: string
      description: '"QSTN"; source labels the query gets iPod Artist Name.'
- id: nal_query
  label: Network Or USB Album Name Query
  kind: query
  command: "NAL"
  params:
    - name: parameter
      type: string
      description: '"QSTN"; source labels the query gets iPod Album Name.'
- id: nti_query
  label: Network Or USB Title Name Query
  kind: query
  command: "NTI"
  params:
    - name: parameter
      type: string
      description: '"QSTN"; source labels the query gets HD Radio Title.'
- id: ntm_query
  label: Network Or USB Time Query
  kind: query
  command: "NTM"
  params:
    - name: parameter
      type: string
      description: '"QSTN"; "mm:ss/mm:ss" Net/USB Time Info (Elapsed time/Track Time Max 99:59)'
- id: ntr_query
  label: Network Or USB Track Query
  kind: query
  command: "NTR"
  params:
    - name: parameter
      type: string
      description: '"QSTN"; "cccc/tttt" Net/USB Track Info (Current Track/Toral Track Max 9999)'
- id: nst_query
  label: Network Or USB Play Status Query
  kind: query
  command: "NST"
  params:
    - name: parameter
      type: string
      description: |
        "QSTN" gets the Net/USB Status
        "prs" Net/USB Play Status (3 letters)
        p -> Play Status: "S": STOP, "P": Play, "p": Pause, "F": FF, "R": FR
        r-> Repeat Status:"-": Off,"R": All,"F": Folder,"1": Repeat 1
        s: UNRESOLVED; source does not define this character.
- id: npr_set
  label: Internet Radio Preset
  kind: action
  command: "NPR"
  params:
    - name: preset
      type: string
      description: '"01"-"28" sets Preset No. 1-40 ( In hexadecimal representation)'

- id: ccd_additional_operation
  label: CD Additional Operation
  kind: action
  command: "CCD"
  params:
    - name: operation
      type: string
      description: |
        Additional documented operation tokens:
        "D.MODE", "FF", "REW", "10", "+10", "D.SKIP", "DISC.F", "DISC.R",
        "DISC1", "DISC2", "DISC3", "DISC4", "DISC5", "DISC6", "STBY", "PON".
        "D.SKIP" and "DISC.F" are DISC +; "DISC.R" is DISC-.
        "STBY" is STANDBY; "PON" is POWER ON.
- id: ceq_preset
  label: Graphics Equalizer Preset
  kind: action
  command: "CEQ"
  params:
    - name: parameter
      type: string
      description: '"PRESET"'
- id: cdt_operation
  label: DAT Recorder Operation
  kind: action
  command: "CDT"
  params:
    - name: operation
      type: string
      description: |
        "PLAY", "RC/PAU", "STOP", "SKIP.F", "SKIP.R", "FF", "REW".
        "RC/PAU" is REC/PAUSE; "SKIP.F" is >>I; "SKIP.R" is I<<.
- id: cdv_operation
  label: DVD Player Operation
  kind: action
  command: "CDV"
  params:
    - name: operation
      type: string
      description: |
        Documented operation tokens:
        "PWRON", "PWROFF", "PLAY", "STOP", "SKIP.F", "SKIP.R", "FF", "REW",
        "PAUSE", "LASTPLAY", "SUBTON/OFF", "SUBTITLE", "SETUP", "TOPMENU",
        "MENU", "UP", "DOWN", "LEFT", "RIGHT", "ENTER", "RETURN", "DISC.F",
        "DISC.R", "AUDIO", "RANDOM", "OP/CL", "ANGLE",
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "0",
        "SEARCH", "DISP", "REPEAT", "MEMORY", "CLEAR", "ABR", "STEP.F",
        "STEP.R", "SLOW.F", "SLOW.R", "ZOOMTG", "ZOOMUP", "ZOOMDN",
        "PROGRE", "VDOFF", "CONMEM", "FUNMEM",
        "DISC1", "DISC2", "DISC3", "DISC4", "DISC5", "DISC6",
        "FOLDUP", "FOLDDN", "P.MODE", "ASCTG", "CDPCD", "MSPUP", "MSPDN",
        "PCT", "RSCTG", "INIT".
        "SUBTON/OFF" is SUBTITLE ON/OFF; "ABR" is A-B REPEAT.
        "STEP.F" is STEP; "STEP.R" is STEP BACK.
        "SLOW.F" is SLOW; "SLOW.R" is SLOW BACK.
        "ZOOMTG" is ZOOM; "ZOOMUP" is ZOOM UP; "ZOOMDN" is ZOOM DOWN.
        "PROGRE" is PROGRESSIVE; "VDOFF" is VIDEO ON/OFF.
        "CONMEM" is CONDITION MEMORY; "FUNMEM" is FUNCTION MEMORY.
        "FOLDUP" is FOLDER UP; "FOLDDN" is FOLDER DOWN.
        "P.MODE" is PLAY MODE; "ASCTG" is ASPECT(Toggle).
        "CDPCD" is CD CHAIN REPEAT.
        "MSPUP" is MULTI SPEED UP; "MSPDN" is MULTI SPEED DOWN.
        "PCT" is PICTURE CONTROL; "RSCTG" is RESOLUTION(Toggle).
        "INIT" is Return to Factory Settings.
- id: cmd_operation
  label: MD Recorder Operation
  kind: action
  command: "CMD"
  params:
    - name: operation
      type: string
      description: |
        Documented operation tokens:
        "PLAY", "STOP", "FF", "REW", "P.MODE", "SKIP.F", "SKIP.R", "PAUSE",
        "REC", "MEMORY", "DISP", "SCROLL", "M.SCAN", "CLEAR", "RANDOM",
        "REPEAT", "ENTER", "EJECT",
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10/0", "nn/nnn",
        "NAME", "GROUP", "STBY".
        "P.MODE" is PLAY MODE; "M.SCAN" is MUSIC SCAN.
        "nn/nnn" is --/---; "STBY" is STANDBY.
- id: ccr_operation
  label: CD-R Recorder Operation
  kind: action
  command: "CCR"
  params:
    - name: operation
      type: string
      description: |
        Documented operation tokens:
        "P.MODE", "PLAY", "STOP", "SKIP.F", "SKIP.R", "PAUSE", "REC",
        "CLEAR", "REPEAT",
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10/0", "nn/nnn",
        "SCROLL", "OP/CL", "DISP", "RANDOM", "MEMORY", "FF", "REW", "STBY".
        "P.MODE" is PLAY MODE; "OP/CL" is OPEN/CLOSE.
        "nn/nnn" is --/---; "STBY" is STANDBY.

- id: ntz_operation
  label: Zone2 Network Operation
  kind: action
  command: "NTZ"
  params:
    - name: operation
      type: string
      description: |
        "PLAY" PLAY KEY
        "STOP" STOP KEY
        "PAUSE" PAUSE KEY
        "TRUP" TRACK UP KEY
        "TRDN" TRACK DOWN KEY
        "CHUP" CH UP (for iRadio)
        "CHDN" CH DOWN (for iRadio)
        Network Model Only.
- id: npz_set
  label: Zone2 Internet Radio Preset
  kind: action
  command: "NPZ"
  params:
    - name: preset
      type: string
      description: '"01"-"28" sets Preset No. 1 - 40 (In hexadecimal representation); Network Model Only.'
- id: nt3_operation
  label: Zone3 Network Operation
  kind: action
  command: "NT3"
  params:
    - name: operation
      type: string
      description: |
        "PLAY" PLAY KEY
        "STOP" STOP KEY
        "PAUSE" PAUSE KEY
        "TRUP" TRACK UP KEY
        "TRDN" TRACK DOWN KEY
        "CHUP" CH UP (for iRadio)
        "CHDN" CH DOWN (for iRadio)
        Network Model Only.
- id: np3_set
  label: Zone3 Internet Radio Preset
  kind: action
  command: "NP3"
  params:
    - name: preset
      type: string
      description: '"01"-"28" sets Preset No. 1-40 (In hexadecimal representation); Network Model Only.'
- id: nt4_operation
  label: Zone4 Network Operation
  kind: action
  command: "NT4"
  params:
    - name: operation
      type: string
      description: |
        "PLAY" PLAY KEY
        "STOP" STOP KEY
        "PAUSE" PAUSE KEY
        "TRUP" TRACK UP KEY
        "TRDN" TRACK DOWN KEY
        Network Model Only.
- id: np4_set
  label: Zone4 Internet Radio Preset
  kind: action
  command: "NP4"
  params:
    - name: preset
      type: string
      description: '"01"-"28" sets Preset No. 1-40 (In hexadecimal representation); Network Model Only.'
```

## Feedbacks
```yaml
# The source does not document explicit feedback message formats beyond
# the generic status-notice pattern ("Receiver sends updated command
# response whenever state changes"). Responses use the same ISCP message
# format as commands. Each QSTN action above has a corresponding response.
#
# UNRESOLVED: explicit response schema (encoding, prefixes, JSON) not stated
# in source - only the response echo of the command + parameter is described.
```

## Variables
```yaml
# UNRESOLVED: no settable runtime variables documented separately from actions.
# All settable parameters in the source are exposed as action rows above.
```

## Events
```yaml
# Source describes unsolicited status notifications: "If Receiver's status
# changes, a Status Message is sent to the Controller." The Status Message
# echoes the relevant ISCP message verbatim (e.g. SLI03 sent on input change).
# No explicit event schema is documented beyond this echo pattern.
#
# UNRESOLVED: detailed event subscription / registration mechanism not stated
# in source - TCP connection must be held open continuously per source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements for the serial / eISCP interface itself.
# The Zone2/Zone3/Zone4 commands document that zone power is only effective when
# the main zone is ON (for ZPW/ZMT/ZVL) - this is an operational dependency, not
# a safety interlock.
```

## Notes
- ISCP over RS-232C: 3-wire (TX/RX/GND), no flow control, DB9 female (pin 2 TX, pin 3 RX, pin 5 GND). Use a straight-through cable to a PC.
- ISCP over Ethernet (eISCP): TCP, default port 60128, configurable 49152-65535 via receiver setup menu. Receiver must be power-cycled after port change.
- eISCP packet wraps the standard ISCP message inside a 16-byte big-endian header (Header Size = 0x00000010, Data Size = length of ISCP message, Version = 0x01, Reserved = 0x000000). Source label is "ISCP".
- ISCP message framing on RS-232: `!1<CMD><PARAM><Terminator>`. Controller→Device terminator is `[CR]` (0x0D), `[LF]` (0x0A), or `[CR][LF]`. Device→Controller terminator is `[EOF]` (0x1A) optionally followed by `[CR]` or `[CR][LF]`.
- Receiver responds to commands with a status message within 50 ms; if no response within 50 ms, the controller should treat the command as failed.
- Interval between consecutive messages must be at least 50 ms.
- TCP connection must be held continuously to receive unsolicited status notifications; the receiver accepts exactly one concurrent client connection.
- TX-SR805 was added to the ISCP spec in version 1.07 (31 May 2007). Source document is the unified ISCP spec version 1.15 (31 August 2009) covering ~15 receiver models — commands marked "No" in the compatibility matrix are still listed here as actions because the source documents them and a downstream verifier may treat them as discoverable command surface; the `id` namespace disambiguates them.
- Source mentions that for newer models than TX-SR805, DTS-ES listening mode is selected via parameter "40" rather than "41". On TX-SR805 the source states "41" is not applicable and "40" is not used for that purpose — listening mode codes 80/81/82/83/86 etc. are the documented surround decoders for this model.
- Version check procedure: with the unit ON, press `DISPLAY + STANDBY/ON` simultaneously to display firmware creation date (yymdd; X=Oct, Y=Nov, Z=Dec).
- The TUNER/XM/SIRIUS/HD Radio and Net-Tune/Network functions are shared between MAIN and ZONE sides but control is separated (i.e. each side has its own command prefix: TUN/TUZ/TU3/TU4, PRZ/PR3/PR4, NTZ/NT3/NT4).
- Network/USB commands (NTC/NAT/NAL/NTI/NTM/NTR/NST/NPR) are listed in the source but the compatibility matrix marks them all "No" for TX-SR805 — they are omitted from this spec's Actions to avoid implying TX-SR805 support.

<!-- UNRESOLVED: firmware version compatibility, fault behavior, error recovery, and the exact set of commands supported by TX-SR805 specifically (vs. the full matrix) are not enumerated discretely in the source beyond the Yes/No per-row matrix; this spec conservatively lists commands whose applicability is documented as "Yes" for TX-SR805 or which are clearly zone/system-level commands listed without a model qualifier. -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-22T20:29:47.005Z
last_checked_at: 2026-10-07T22:07:36.623Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T22:07:36.623Z
matched_actions: 367
action_count: 367
confidence: medium
summary: "All 367 action units match source command tokens and the transport values are stated in the source. Minor TX-SR805 per-model support claims are unverifiable but are not fabrications. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TX-SR805 is one model among ~15 in the source's compatibility matrix; many commands in the catalogue are \"No\" for TX-SR805 specifically. This spec enumerates every command documented in the source — the verifier will judge whether the per-model \"Yes/No\" mapping is preserved. Firmware version not stated in source."
- "explicit response schema (encoding, prefixes, JSON) not stated"
- "no settable runtime variables documented separately from actions."
- "detailed event subscription / registration mechanism not stated"
- "no multi-step macro sequences documented in source."
- "source contains no explicit safety warnings, interlock procedures,"
- "firmware version compatibility, fault behavior, error recovery, and the exact set of commands supported by TX-SR805 specifically (vs. the full matrix) are not enumerated discretely in the source beyond the Yes/No per-row matrix; this spec conservatively lists commands whose applicability is documented as \"Yes\" for TX-SR805 or which are clearly zone/system-level commands listed without a model qualifier."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
